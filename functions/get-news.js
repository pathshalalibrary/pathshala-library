// File location: /functions/get-news.js

export async function onRequest(context) {
    // Get the 'lang' parameter from the URL, e.g., /get-news?lang=English
    const { searchParams } = new URL(context.request.url);
    const lang = searchParams.get('lang');
  
    if (!lang) {
      return new Response("Language parameter is missing.", { status: 400 });
    }
  
    // 'context.env.DAILY_NEWS' is how a Pages Function accesses the KV store
    const newsContent = await context.env.DAILY_NEWS.get(`current_affairs_${lang}`);
  
    if (newsContent === null) {
      return new Response(`Content for language '${lang}' not found.`, { status: 404 });
    }
  
    // Return the stored HTML content
    return new Response(newsContent, {
      headers: { 'Content-Type': 'text/html' },
    });
  }