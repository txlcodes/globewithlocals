export interface CityInfoData {
    title: string;
    seoTitle?: string;
    description: string;
    heroImage: string;
    sections: any[];
    lastUpdated?: string;
    faqs?: { q: string; a: string }[];
    jsonLd?: any;
    fastFacts?: { icon: string; label: string; value: string }[];
}

// No bundled city guides: city pages render tours from the API only.
export function getCityInfoContent(_slug: string): CityInfoData | null {
    return null;
}
