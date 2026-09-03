import { useEffect, useState } from "react";

const CITIES = [
  { name: "LONDON", timezone: "Europe/London", open: 8, close: 17, icon: "🇬🇧" },
  { name: "NEW YORK", timezone: "America/New_York", open: 8, close: 17, icon: "🇺🇸" },
  { name: "TOKYO", timezone: "Asia/Tokyo", open: 9, close: 18, icon: "🇯🇵" },
];

export function useWorldTime() {
  const [times, setTimes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch ម៉ោងតាម Timezone ចេញពី WorldTimeAPI
    const fetchAllTimes = async () => {
      try {
        const timeResults = {};
        await Promise.all(
          CITIES.map(async (city) => {
            try {
              const res = await fetch(`https://worldtimeapi.org/api/timezone/${city.timezone}`);
              const data = await res.json();
              timeResults[city.name] = new Date(data.datetime);
            } catch (err) {
              // បើ API Network មានបញ្ហា វានឹងយកម៉ោង System Computer មកជំនួស (Fallback)
              timeResults[city.name] = new Date();
            }
          })
        );
        setTimes(timeResults);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timezone API:", err);
      }
    };

    fetchAllTimes();

    // 2. ដើរម៉ោង ១ វិនាទីម្ដង ( Client-side Timer )
    const interval = setInterval(() => {
      setTimes((prevTimes) => {
        const nextTimes = { ...prevTimes };
        Object.keys(nextTimes).forEach((cityName) => {
          if (nextTimes[cityName]) {
            nextTimes[cityName] = new Date(nextTimes[cityName].getTime() + 1000);
          }
        });
        return nextTimes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { times, loading, CITIES };
}