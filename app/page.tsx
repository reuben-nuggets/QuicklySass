'use client';
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";

let json_data;

async function generateCompanyDetails(){
	const genAI = new GoogleGenerativeAI(String(process.env.GEMINI_API_KEY));
	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash",
	});
	const prompt = `Give me details for a company call Quickly SaSS using this json template and include no comments :
	Return: {
		'name': string,
		'description': string,
		'primary_color': string,
		'secondary_color': string
	}`;
	const result = await model.generateContent(prompt);
	json_data = result.response.text().replaceAll("`", "");
	json_data = json_data.replaceAll("\n", "");
	json_data = json_data.slice(4);
	json_data = JSON.parse(json_data);
	console.log(json_data);
}

generateCompanyDetails();

export default function Home() {

	function sleep(ms:number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async function genImage(){
		const options = {
			method: 'POST',
			headers: {
			  accept: 'application/json',
			  'content-type': 'application/json',
			  authorization: 'Bearer key-a4LqqDjW3sLqgNCr4gt42vkTIVfikd9knuXGjVVXWXzYIj6l5FIRMUI7xmCiAouaoRhXGuMbeltfgOAZNdiXvpjhXK7CLnE'
			},
			body: JSON.stringify({
			  prompt: 'Give me  a logo for a company called quickly SaSS. Make it have a transparent background and be simple, using mostly plain geometric shapes. Make sure the background is transparent, not white',
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
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
		<h1 className="text-3xl">Hello</h1>
		<button className="btn btn-primary" onClick={genImage}>Generate Image</button>
		<div className="flex items-center">
			<svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				{/*  Replace this with your actual SVG logo if you have one. */}
				<path d="M12 2L2 22h20L12 2Z" fill="currentColor"/> {/* Placeholder */}
			</svg>
			<span className="text-2xl font-bold text-gray-800 ml-2">quickly SaSS</span>
		</div>
		</div>
	);
}
