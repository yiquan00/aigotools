import { NextResponse } from "next/server";

const GIST_URL = "https://gist.githubusercontent.com/yiquan00/35f9402c05cb28fdaeb10dc814066bee/raw/friend-links.json";

export async function GET() {
  try {
    const response = await fetch(GIST_URL, {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      next: { revalidate: 60 } // 1 minute cache
    });

    if (!response.ok) {
      throw new Error('Failed to fetch friend links');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch friend links' }, { status: 500 });
  }
}
