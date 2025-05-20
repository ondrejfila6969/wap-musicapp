import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            //here musí bejt backend
            const allData = ["Dreams", "Skyfall", "Thunder", "Forever"];
            const filtered = allData.filter((item) =>
                item.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        }
    }, [query]);

    return (
        <div className="p-8">
            <h2 className="text-xl font-bold mb-4">Výsledky hledání pro: {query}</h2>
                <div className="text-red-200">
                    {results.length > 0 ? (
                        results.map((item, index) => <p key={index}>{item}</p>)
                    ) : (
                        <p>Žádné výsledky.</p>
                    )}
                </div>
        </div>
    );
}
