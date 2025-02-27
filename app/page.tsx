'use client';
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GetColorName } from 'hex-color-to-color-name';
import { FormEvent, useState } from 'react';
import ReactDOM from 'react-dom/client';

interface company_data {
	name:string,
	description:string,
	primary_color:string,
	secondary_color:string,
	niche: string
}

interface competitor {
	name:string,
	url:string,
	description:string
}

let company_data:company_data;
let company_data_string:string;
let competitors_data:[competitor];
let competitor_string:string;

function sleep(millisec:number) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, millisec);
    })
}




async function generateCompanyDetails(userPrompt:string){
	const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY));
	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash",
	});
	const prompt = `Give me details for a company called ${userPrompt} using this json template and include no comments also don't use any neutral colours for the primary and scondary colors, a.k.a no gray/black/white. Make sure you never include comments in your json. The niche should be based of the detailed description that you generate :
	Return: {
		'niche': string,
		'name': string,
		'description': string,
		'primary_color': string,
		'secondary_color': string
	}`;
	const result = await model.generateContent(prompt);
	company_data_string = result.response.text().replaceAll("`", "");
	company_data_string = company_data_string.replaceAll("\n", "");
	company_data_string = company_data_string.slice(4);
	company_data = JSON.parse(company_data_string);
	console.log(company_data);
	generateCompetitor();
}

async function generateCompetitor(){
	const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY));
	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash",
	});
	const prompt = `Give me the 5 biggest companies who are like this description of a company ${company_data.description} in plain json format with no comments:
	Return: {
		'name': string,
		'url': string,
		"description": string
	}`;
	const result = await model.generateContent(prompt);
	competitor_string = result.response.text().replaceAll("`", "");
	competitor_string = competitor_string.replaceAll("\n", "");
	competitor_string = competitor_string.slice(4);
	competitors_data = JSON.parse(competitor_string);
	console.log(competitors_data);
}

async function genImage(){
	const primaryColorName = GetColorName(company_data.primary_color);
	const secondaryColorName = GetColorName(company_data.secondary_color);
	const options = {
		method: 'POST',
		headers: {
		  accept: 'application/json',
		  'content-type': 'application/json',
		  authorization: 'Bearer key-a4LqqDjW3sLqgNCr4gt42vkTIVfikd9knuXGjVVXWXzYIj6l5FIRMUI7xmCiAouaoRhXGuMbeltfgOAZNdiXvpjhXK7CLnE'
		},
		body: JSON.stringify({
		  prompt: `Give me  a logo for a company called quickly SaSS. Make it have a black background and be simple, using mostly plain geometric shapes. Use the main colour of ${primaryColorName} and if nessecary a secondary colour of ${secondaryColorName} `,
		  width: 512,
		  height: 512,
		  output_format: 'png',
		  response_format: 'url'
		})
	  };
	  
	  fetch('https://api.getimg.ai/v1/flux-schnell/text-to-image', options)
		.then(res => res.json())
		.then(res => console.log(res))
		.catch(err => console.error(err));
}


export default function Home() {
	const [prompt, setPrompt] = useState("");
	
	const generateACompanyHandler = (event:FormEvent) => {
		event.preventDefault();
		generateCompanyDetails(prompt);
	}

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<form onSubmit={generateACompanyHandler}>
				<label className="px-5">Generate A Company</label>
				<input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="p-2 bg-black border-2 border-gray-700 rounded-lg" id="genCompanyInput"></input>
				<input type="submit"></input>
			</form>
			<button>Generate Company</button>
			<h1 className="text-3xl">Hello</h1>
			<button className="btn btn-primary" onClick={genImage}>Generate Image</button>
			<button className="btn btn-primary" onClick={generateCompetitor}>Generate Competitors</button>
		</div>
	);
}
