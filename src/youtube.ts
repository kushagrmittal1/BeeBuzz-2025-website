// utils/youtube.ts
export async function getYouTubeTitle(videoId: string): Promise<string> {
    // ⚠️ Proxy required in browser (CORS bypass)
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `${proxy}https://www.youtube.com/watch?v=${videoId}`;
  
    try {
      const res = await fetch(url);
      const html = await res.text();
  
      const match = html.match(/<title>(.*?)<\/title>/);
      return match ? match[1].replace(" - YouTube", "").trim() : "";
    } catch (err) {
      console.error("Failed to fetch YouTube title", err);
      return "";
    }
  }
  
  export async function mapYouTubeShorts(
    urls: string[],
    options: {
      category?: string;
      subcategory?: string;
      client?: string;
      relatedProjects?: any[];
    } = {}
  ) {
    const results = [];
  
    for (const url of urls) {
      const match = url.match(/shorts\/([^?&]+)/);
      const id = match ? match[1] : null;
      if (!id) continue;
  
      const title = await getYouTubeTitle(id);
  
      results.push({
        id,
        title,
        videoUrl: `https://www.youtube.com/shorts/${id}`,
        thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        category: options.category || "Post Production",
        subcategory: options.subcategory || "Post Production",
        client: options.client || "",
        relatedProjects: options.relatedProjects || [],
      });
    }
  
    return results;
  }
  