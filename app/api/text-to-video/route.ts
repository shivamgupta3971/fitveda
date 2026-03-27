import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://modelslab.com/api/v6/text_to_video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: process.env.MODELSLAB_API_KEY,
        prompt,
        width: "512",
        height: "512",
        num_frames: 16,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate video" });
  }
}