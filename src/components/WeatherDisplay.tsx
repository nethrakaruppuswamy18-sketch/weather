import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, 
  Wind, 
  Droplets, 
  Thermometer, 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudLightning, 
  Snowflake, 
  CloudFog,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const API_KEY = "6268af2dfcde620a2dd2ad8332cab30f";
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface WeatherDisplayProps {
  onBack: () => void;
}

export default function WeatherDisplay({ onBack }: WeatherDisplayProps) {
  const [city, setCity] = useState('New York');
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    if (!API_KEY) {
      setError('API Key is missing. Please add VITE_OPENWEATHER_API_KEY to your settings.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}?q=${cityName}&units=metric&appid=${API_KEY}`);
      setWeather(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'City not found or network error');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setCity(input);
      fetchWeather(input);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear': return <Sun className="w-20 h-20 text-yellow-400" />;
      case 'clouds': return <Cloud className="w-20 h-20 text-slate-300" />;
      case 'rain': case 'drizzle': return <CloudRain className="w-20 h-20 text-blue-400" />;
      case 'thunderstorm': return <CloudLightning className="w-20 h-20 text-purple-400" />;
      case 'snow': return <Snowflake className="w-20 h-20 text-white" />;
      case 'mist': case 'smoke': case 'haze': case 'dust': case 'fog': return <CloudFog className="w-20 h-20 text-slate-400" />;
      default: return <Cloud className="w-20 h-20 text-slate-300" />;
    }
  };

  const getBackgroundClass = () => {
    if (!weather) return 'bg-neutral';
    const condition = weather.weather[0].main.toLowerCase();
    if (condition === 'clear') return 'bg-clear';
    if (condition === 'clouds') return 'bg-clouds';
    if (condition === 'rain' || condition === 'drizzle') return 'bg-rain';
    if (condition === 'thunderstorm') return 'bg-thunderstorm';
    if (condition === 'snow') return 'bg-snow';
    return 'bg-clouds';
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden transition-all duration-1000`}>
      {/* Background atmosphere */}
      <div className={`atmosphere ${getBackgroundClass()}`} />

      {/* Global Search Bar - Absolute Positioning */}
      <div className="absolute top-10 w-full flex justify-center items-center px-6 gap-4 z-50">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="editorial-glass p-3 rounded-full text-editorial-secondary hover:text-editorial-accent transition-colors hidden md:flex"
          title="Back to Landing"
        >
          <MapPin className="w-5 h-5 rotate-180" />
        </motion.button>

        <form 
          onSubmit={handleSearch} 
          className="w-full max-w-sm editorial-glass rounded-full py-3 px-6 flex items-center gap-3 group focus-within:ring-2 focus-within:ring-editorial-accent/50 transition-all"
        >
          <Search className="w-5 h-5 text-editorial-secondary group-focus-within:text-editorial-accent transition-colors" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search city..."
            className="flex-1 bg-transparent border-none outline-none font-light text-editorial-primary placeholder:text-editorial-secondary/50"
          />
          <button type="submit" className="hidden">Search</button>
        </form>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="editorial-glass w-full max-w-2xl rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-[1.2fr_1fr] relative z-10"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-32 gap-4"
            >
              <div className="w-10 h-10 border-2 border-editorial-secondary/20 border-t-editorial-accent rounded-full animate-spin" />
              <p className="text-editorial-secondary font-bold tracking-[0.2em] text-[10px] uppercase">Aether Sync</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-32 gap-3 text-red-300 px-8 text-center"
            >
              <AlertCircle className="w-10 h-10 mb-2 opacity-50" />
              <p className="font-medium">{error}</p>
              <button 
                onClick={() => fetchWeather('New York')} 
                className="text-[10px] uppercase tracking-widest text-editorial-secondary hover:text-editorial-primary underline underline-offset-4 mt-4"
              >
                Reset to default
              </button>
            </motion.div>
          ) : weather ? (
            <>
              {/* Main Info Side */}
              <motion.div 
                key="main-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-12 flex flex-col justify-between min-h-[440px] border-b md:border-b-0 md:border-r border-white/10"
              >
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-editorial-accent mb-4">
                    Current Location
                  </div>
                  <h1 className="text-5xl font-light tracking-tight text-white mb-2">
                    {weather.name}
                  </h1>
                </div>

                <div className="flex flex-col gap-2">
                   <div className="relative inline-flex items-start">
                    <span className="text-[120px] font-extralight tracking-[-0.04em] leading-[0.9] tabular-nums">
                      {Math.round(weather.main.temp)}
                    </span>
                    <span className="text-4xl font-normal mt-4 ml-1 opacity-80">°</span>
                  </div>
                  <div className="flex items-center gap-2 text-editorial-secondary text-lg">
                    {getWeatherIcon(weather.weather[0].main)}
                    <span className="capitalize">{weather.weather[0].description}</span>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid Side */}
              <motion.div 
                key="stats-grid"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-12 grid grid-rows-3 gap-8 bg-black/10"
              >
                <div className="flex flex-col justify-center gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-editorial-secondary">Humidity</span>
                  <span className="text-3xl font-medium">{weather.main.humidity}%</span>
                </div>
                <div className="flex flex-col justify-center gap-1 border-y border-white/5 py-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-editorial-secondary">Wind Speed</span>
                  <span className="text-3xl font-medium">{weather.wind.speed} m/s</span>
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-editorial-secondary">Feels Like</span>
                  <span className="text-3xl font-medium">{Math.round(weather.main.feels_like)}°C</span>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </motion.div>

      {/* Footer Meta */}
      <div className="absolute bottom-10 w-full max-w-2xl px-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.15em] text-editorial-secondary/40">
        <div className="flex items-center">
          <span className="dot" />
          Live Data Syncing
        </div>
        <div>
          Last Sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
