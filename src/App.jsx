import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wkffzefvfolyjyrlwojd.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZmZ6ZWZ2Zm9seWp5cmx3b2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNTc2NDAsImV4cCI6MjA4ODYzMzY0MH0.bIA3h3h4ULjVksO1JDt_lhRiJMW-_OWBm-SX9RQ6cUs";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Data --------------------------------------------------------------------
// major = large city, minor = town/smaller city
const ROUTE_MAP = {
  // Maharashtra
  "Mumbai": { lat: 19.076, lng: 72.877, type: "major" },
  "Pune": { lat: 18.520, lng: 73.856, type: "major" },
  "Nashik": { lat: 19.998, lng: 73.789, type: "major" },
  "Aurangabad": { lat: 19.877, lng: 75.343, type: "major" },
  "Nagpur": { lat: 21.145, lng: 79.082, type: "major" },
  "Solapur": { lat: 17.686, lng: 75.906, type: "major" },
  "Kolhapur": { lat: 16.705, lng: 74.243, type: "major" },
  "Amravati": { lat: 20.932, lng: 77.752, type: "major" },
  "Nanded": { lat: 19.160, lng: 77.311, type: "major" },
  "Thane": { lat: 19.218, lng: 72.978, type: "major" },
  "Navi Mumbai": { lat: 19.033, lng: 73.029, type: "major" },
  "Vasai": { lat: 19.370, lng: 72.833, type: "minor" },
  "Igatpuri": { lat: 19.698, lng: 73.559, type: "minor" },
  "Sinnar": { lat: 19.847, lng: 74.000, type: "minor" },
  "Shirdi": { lat: 19.766, lng: 74.476, type: "minor" },
  "Ahmednagar": { lat: 19.094, lng: 74.739, type: "minor" },
  "Sangamner": { lat: 19.575, lng: 74.205, type: "minor" },
  "Kopargaon": { lat: 19.892, lng: 74.480, type: "minor" },
  "Dhule": { lat: 20.900, lng: 74.774, type: "minor" },
  "Jalgaon": { lat: 21.004, lng: 75.562, type: "major" },
  "Malegaon": { lat: 20.560, lng: 74.524, type: "minor" },
  "Chandrapur": { lat: 19.962, lng: 79.299, type: "minor" },
  "Yavatmal": { lat: 20.388, lng: 78.120, type: "minor" },
  "Akola": { lat: 20.706, lng: 77.006, type: "minor" },
  "Wardha": { lat: 20.745, lng: 78.600, type: "minor" },
  "Buldhana": { lat: 20.529, lng: 76.184, type: "minor" },
  "Hingoli": { lat: 19.720, lng: 77.150, type: "minor" },
  "Latur": { lat: 18.400, lng: 76.560, type: "minor" },
  "Osmanabad": { lat: 18.186, lng: 76.037, type: "minor" },
  "Satara": { lat: 17.686, lng: 74.002, type: "minor" },
  "Sangli": { lat: 16.854, lng: 74.564, type: "minor" },
  "Ratnagiri": { lat: 16.994, lng: 73.300, type: "minor" },
  "Panvel": { lat: 18.993, lng: 73.114, type: "minor" },
  "Khopoli": { lat: 18.787, lng: 73.345, type: "minor" },
  "Lonavala": { lat: 18.748, lng: 73.406, type: "minor" },
  "Khandala": { lat: 18.757, lng: 73.374, type: "minor" },
  "Talegaon": { lat: 18.726, lng: 73.678, type: "minor" },
  "Dehu Road": { lat: 18.703, lng: 73.750, type: "minor" },
  "Uruli Kanchan": { lat: 18.465, lng: 74.065, type: "minor" },
  "Daund": { lat: 18.461, lng: 74.583, type: "minor" },
  "Baramati": { lat: 18.154, lng: 74.583, type: "minor" },
  "Phaltan": { lat: 17.987, lng: 74.431, type: "minor" },
  "Shirur": { lat: 18.826, lng: 74.372, type: "minor" },
  "Manmad": { lat: 20.254, lng: 74.438, type: "minor" },
  "Nandurbar": { lat: 21.370, lng: 74.241, type: "minor" },
  "Bhusawal": { lat: 21.044, lng: 75.789, type: "minor" },
  "Pachora": { lat: 20.660, lng: 75.355, type: "minor" },
  "Chalisgaon": { lat: 20.460, lng: 74.994, type: "minor" },
  "Shegaon": { lat: 20.795, lng: 76.694, type: "minor" },
  "Khamgaon": { lat: 20.707, lng: 76.566, type: "minor" },
  "Malkapur": { lat: 20.883, lng: 76.217, type: "minor" },
  "Pusad": { lat: 19.913, lng: 77.573, type: "minor" },
  "Wani": { lat: 20.057, lng: 78.953, type: "minor" },
  "Kamptee": { lat: 21.215, lng: 79.193, type: "minor" },
  "Bhandara": { lat: 21.166, lng: 79.650, type: "minor" },
  "Gondia": { lat: 21.460, lng: 80.196, type: "minor" },
  "Pandharkawada": { lat: 20.014, lng: 78.526, type: "minor" },
  "Narkhed": { lat: 21.444, lng: 78.591, type: "minor" },
  "Seloo": { lat: 20.818, lng: 78.960, type: "minor" },
  "Hinganghat": { lat: 20.547, lng: 78.836, type: "minor" },
  "Pulgaon": { lat: 20.725, lng: 78.325, type: "minor" },
  "Dhamangaon": { lat: 20.730, lng: 77.309, type: "minor" },
  "Badnera": { lat: 20.854, lng: 77.720, type: "minor" },

  // Gujarat
  "Surat": { lat: 21.170, lng: 72.831, type: "major" },
  "Ahmedabad": { lat: 23.022, lng: 72.571, type: "major" },
  "Vadodara": { lat: 22.307, lng: 73.181, type: "major" },
  "Rajkot": { lat: 22.291, lng: 70.794, type: "major" },
  "Bhavnagar": { lat: 21.766, lng: 72.152, type: "major" },
  "Jamnagar": { lat: 22.470, lng: 70.057, type: "major" },
  "Gandhinagar": { lat: 23.216, lng: 72.684, type: "major" },
  "Anand": { lat: 22.556, lng: 72.951, type: "minor" },
  "Nadiad": { lat: 22.693, lng: 72.861, type: "minor" },
  "Bharuch": { lat: 21.705, lng: 72.998, type: "minor" },
  "Navsari": { lat: 20.946, lng: 72.952, type: "minor" },
  "Valsad": { lat: 20.592, lng: 72.924, type: "minor" },
  "Vapi": { lat: 20.372, lng: 72.905, type: "minor" },
  "Bilimora": { lat: 20.760, lng: 72.963, type: "minor" },
  "Vyara": { lat: 21.107, lng: 73.390, type: "minor" },
  "Bardoli": { lat: 21.121, lng: 73.116, type: "minor" },
  "Kim": { lat: 21.357, lng: 72.946, type: "minor" },
  "Kosamba": { lat: 21.462, lng: 72.963, type: "minor" },
  "Karjan": { lat: 22.053, lng: 73.122, type: "minor" },
  "Halol": { lat: 22.502, lng: 73.476, type: "minor" },
  "Godhra": { lat: 22.777, lng: 73.616, type: "minor" },
  "Lunawada": { lat: 23.135, lng: 73.614, type: "minor" },
  "Modasa": { lat: 23.464, lng: 73.299, type: "minor" },
  "Himmatnagar": { lat: 23.600, lng: 72.967, type: "minor" },
  "Mehsana": { lat: 23.600, lng: 72.369, type: "minor" },
  "Patan": { lat: 23.849, lng: 72.124, type: "minor" },
  "Palanpur": { lat: 24.175, lng: 72.438, type: "minor" },
  "Deesa": { lat: 24.259, lng: 72.195, type: "minor" },
  "Visnagar": { lat: 23.699, lng: 72.546, type: "minor" },
  "Unjha": { lat: 23.806, lng: 72.395, type: "minor" },
  "Sidhpur": { lat: 23.916, lng: 72.381, type: "minor" },
  "Vijapur": { lat: 23.565, lng: 72.755, type: "minor" },
  "Kalol": { lat: 23.249, lng: 72.506, type: "minor" },
  "Sanand": { lat: 22.983, lng: 72.380, type: "minor" },
  "Bavla": { lat: 22.829, lng: 72.368, type: "minor" },
  "Dholka": { lat: 22.726, lng: 72.468, type: "minor" },
  "Botad": { lat: 22.166, lng: 71.664, type: "minor" },
  "Dhrangadhra": { lat: 22.991, lng: 71.472, type: "minor" },
  "Surendranagar": { lat: 22.730, lng: 71.636, type: "minor" },
  "Wadhwan": { lat: 22.700, lng: 71.686, type: "minor" },
  "Morbi": { lat: 22.813, lng: 70.837, type: "minor" },
  "Gondal": { lat: 21.961, lng: 70.797, type: "minor" },
  "Jetpur": { lat: 21.755, lng: 70.625, type: "minor" },
  "Wankaner": { lat: 22.609, lng: 70.944, type: "minor" },
  "Palitana": { lat: 21.524, lng: 71.827, type: "minor" },
  "Mahuva": { lat: 21.085, lng: 71.768, type: "minor" },
  "Amreli": { lat: 21.605, lng: 71.221, type: "minor" },
  "Junagadh": { lat: 21.522, lng: 70.457, type: "major" },
  "Porbandar": { lat: 21.641, lng: 69.610, type: "minor" },
  "Dwarka": { lat: 22.238, lng: 68.967, type: "minor" },
  "Anjar": { lat: 23.110, lng: 70.022, type: "minor" },
  "Bhuj": { lat: 23.251, lng: 69.666, type: "major" },
  "Gandhidham": { lat: 23.071, lng: 70.134, type: "minor" },
  "Adipur": { lat: 23.101, lng: 70.176, type: "minor" },

  // Rajasthan
  "Jaipur": { lat: 26.912, lng: 75.787, type: "major" },
  "Jodhpur": { lat: 26.292, lng: 73.027, type: "major" },
  "Udaipur": { lat: 24.571, lng: 73.682, type: "major" },
  "Kota": { lat: 25.182, lng: 75.831, type: "major" },
  "Ajmer": { lat: 26.449, lng: 74.639, type: "major" },
  "Bikaner": { lat: 28.017, lng: 73.312, type: "major" },
  "Alwar": { lat: 27.565, lng: 76.621, type: "minor" },
  "Sikar": { lat: 27.613, lng: 75.140, type: "minor" },
  "Bharatpur": { lat: 27.217, lng: 77.489, type: "minor" },
  "Dhaulpur": { lat: 26.700, lng: 77.889, type: "minor" },
  "Sawai Madhopur": { lat: 26.001, lng: 76.352, type: "minor" },
  "Tonk": { lat: 26.166, lng: 75.789, type: "minor" },
  "Bundi": { lat: 25.437, lng: 75.647, type: "minor" },
  "Chittorgarh": { lat: 24.889, lng: 74.624, type: "minor" },
  "Bhilwara": { lat: 25.347, lng: 74.636, type: "minor" },
  "Rajsamand": { lat: 25.067, lng: 73.881, type: "minor" },
  "Nathdwara": { lat: 24.933, lng: 73.817, type: "minor" },
  "Dungarpur": { lat: 23.844, lng: 73.715, type: "minor" },
  "Banswara": { lat: 23.547, lng: 74.444, type: "minor" },
  "Pali": { lat: 25.771, lng: 73.323, type: "minor" },
  "Barmer": { lat: 25.745, lng: 71.393, type: "minor" },
  "Jaisalmer": { lat: 26.914, lng: 70.916, type: "minor" },
  "Nagaur": { lat: 27.200, lng: 73.734, type: "minor" },
  "Jhunjhunu": { lat: 28.132, lng: 75.399, type: "minor" },
  "Churu": { lat: 28.296, lng: 74.963, type: "minor" },
  "Hanumangarh": { lat: 29.581, lng: 74.330, type: "minor" },
  "Sriganganagar": { lat: 29.921, lng: 73.879, type: "minor" },
  "Dausa": { lat: 26.893, lng: 76.330, type: "minor" },
  "Bandikui": { lat: 27.052, lng: 76.572, type: "minor" },
  "Shahpura": { lat: 27.392, lng: 75.961, type: "minor" },
  "Kishangarh": { lat: 26.593, lng: 74.862, type: "minor" },
  "Beawar": { lat: 26.100, lng: 74.318, type: "minor" },
  "Pushkar": { lat: 26.491, lng: 74.553, type: "minor" },
  "Nimbahera": { lat: 24.620, lng: 74.687, type: "minor" },
  "Sirohi": { lat: 24.883, lng: 72.860, type: "minor" },
  "Abu Road": { lat: 24.484, lng: 72.784, type: "minor" },
  "Luni": { lat: 26.158, lng: 73.030, type: "minor" },
  "Pindwara": { lat: 24.796, lng: 73.040, type: "minor" },
  "Falna": { lat: 25.113, lng: 73.162, type: "minor" },
  "Rani": { lat: 25.426, lng: 73.339, type: "minor" },
  "Marwar Junction": { lat: 25.698, lng: 73.386, type: "minor" },

  // Delhi / NCR / Haryana / Punjab
  "Delhi": { lat: 28.613, lng: 77.209, type: "major" },
  "Gurgaon": { lat: 28.459, lng: 77.026, type: "major" },
  "Faridabad": { lat: 28.408, lng: 77.313, type: "major" },
  "Ghaziabad": { lat: 28.669, lng: 77.438, type: "major" },
  "Noida": { lat: 28.535, lng: 77.391, type: "major" },
  "Chandigarh": { lat: 30.733, lng: 76.779, type: "major" },
  "Amritsar": { lat: 31.634, lng: 74.872, type: "major" },
  "Ludhiana": { lat: 30.901, lng: 75.857, type: "major" },
  "Jalandhar": { lat: 31.325, lng: 75.579, type: "major" },
  "Patiala": { lat: 30.339, lng: 76.386, type: "major" },
  "Ambala": { lat: 30.377, lng: 76.776, type: "minor" },
  "Panipat": { lat: 29.390, lng: 76.970, type: "minor" },
  "Karnal": { lat: 29.686, lng: 76.990, type: "minor" },
  "Kurukshetra": { lat: 29.969, lng: 76.848, type: "minor" },
  "Rohtak": { lat: 28.895, lng: 76.607, type: "minor" },
  "Hisar": { lat: 29.151, lng: 75.726, type: "minor" },
  "Sonipat": { lat: 28.995, lng: 77.021, type: "minor" },
  "Bahadurgarh": { lat: 28.692, lng: 76.923, type: "minor" },
  "Jhajjar": { lat: 28.608, lng: 76.656, type: "minor" },
  "Rewari": { lat: 28.193, lng: 76.614, type: "minor" },
  "Bhiwani": { lat: 28.797, lng: 76.139, type: "minor" },
  "Sirsa": { lat: 29.536, lng: 75.027, type: "minor" },
  "Fatehabad": { lat: 29.517, lng: 75.453, type: "minor" },
  "Jind": { lat: 29.316, lng: 76.314, type: "minor" },
  "Kaithal": { lat: 29.801, lng: 76.399, type: "minor" },
  "Yamunanagar": { lat: 30.130, lng: 77.276, type: "minor" },
  "Nuh": { lat: 28.100, lng: 77.014, type: "minor" },
  "Palwal": { lat: 28.143, lng: 77.332, type: "minor" },
  "Manesar": { lat: 28.358, lng: 76.939, type: "minor" },
  "Gurdaspur": { lat: 32.039, lng: 75.405, type: "minor" },
  "Pathankot": { lat: 32.274, lng: 75.652, type: "minor" },
  "Hoshiarpur": { lat: 31.533, lng: 75.912, type: "minor" },
  "Nawanshahr": { lat: 31.123, lng: 76.115, type: "minor" },
  "Phagwara": { lat: 31.227, lng: 75.773, type: "minor" },
  "Kapurthala": { lat: 31.381, lng: 75.381, type: "minor" },
  "Firozpur": { lat: 30.924, lng: 74.611, type: "minor" },
  "Fazilka": { lat: 30.402, lng: 74.028, type: "minor" },
  "Bathinda": { lat: 30.206, lng: 74.945, type: "major" },
  "Moga": { lat: 30.817, lng: 75.170, type: "minor" },
  "Barnala": { lat: 30.378, lng: 75.547, type: "minor" },
  "Sangrur": { lat: 30.244, lng: 75.844, type: "minor" },
  "Fatehgarh Sahib": { lat: 30.641, lng: 76.387, type: "minor" },
  "Ropar": { lat: 30.963, lng: 76.531, type: "minor" },
  "Morinda": { lat: 30.801, lng: 76.501, type: "minor" },
  "Khanna": { lat: 30.702, lng: 76.217, type: "minor" },
  "Doraha": { lat: 30.793, lng: 76.024, type: "minor" },
  "Sahnewal": { lat: 30.852, lng: 75.944, type: "minor" },
  "Mandi Gobindgarh": { lat: 30.665, lng: 76.305, type: "minor" },

  // Uttar Pradesh
  "Agra": { lat: 27.176, lng: 78.008, type: "major" },
  "Lucknow": { lat: 26.847, lng: 80.947, type: "major" },
  "Kanpur": { lat: 26.460, lng: 80.331, type: "major" },
  "Varanasi": { lat: 25.317, lng: 82.973, type: "major" },
  "Allahabad": { lat: 25.435, lng: 81.846, type: "major" },
  "Meerut": { lat: 28.984, lng: 77.706, type: "major" },
  "Bareilly": { lat: 28.347, lng: 79.415, type: "major" },
  "Aligarh": { lat: 27.881, lng: 78.080, type: "major" },
  "Moradabad": { lat: 28.838, lng: 78.773, type: "major" },
  "Saharanpur": { lat: 29.963, lng: 77.546, type: "major" },
  "Gorakhpur": { lat: 26.760, lng: 83.373, type: "major" },
  "Firozabad": { lat: 27.152, lng: 78.395, type: "minor" },
  "Mathura": { lat: 27.492, lng: 77.673, type: "minor" },
  "Vrindavan": { lat: 27.579, lng: 77.695, type: "minor" },
  "Hathras": { lat: 27.604, lng: 78.052, type: "minor" },
  "Etah": { lat: 27.556, lng: 78.666, type: "minor" },
  "Mainpuri": { lat: 27.235, lng: 79.022, type: "minor" },
  "Etawah": { lat: 26.782, lng: 79.021, type: "minor" },
  "Jhansi": { lat: 25.447, lng: 78.588, type: "major" },
  "Lalitpur": { lat: 24.687, lng: 78.415, type: "minor" },
  "Orai": { lat: 25.989, lng: 79.454, type: "minor" },
  "Banda": { lat: 25.480, lng: 80.336, type: "minor" },
  "Fatehpur": { lat: 25.930, lng: 80.813, type: "minor" },
  "Rae Bareli": { lat: 26.215, lng: 81.242, type: "minor" },
  "Sultanpur": { lat: 26.265, lng: 82.073, type: "minor" },
  "Faizabad": { lat: 26.775, lng: 82.145, type: "minor" },
  "Gonda": { lat: 27.133, lng: 81.960, type: "minor" },
  "Bahraich": { lat: 27.574, lng: 81.594, type: "minor" },
  "Sitapur": { lat: 27.561, lng: 80.680, type: "minor" },
  "Hardoi": { lat: 27.398, lng: 80.129, type: "minor" },
  "Unnao": { lat: 26.546, lng: 80.489, type: "minor" },
  "Lakhimpur": { lat: 27.945, lng: 80.779, type: "minor" },
  "Ghazipur": { lat: 25.578, lng: 83.580, type: "minor" },
  "Jaunpur": { lat: 25.730, lng: 82.686, type: "minor" },
  "Mirzapur": { lat: 25.145, lng: 82.569, type: "minor" },
  "Bhadohi": { lat: 25.399, lng: 82.566, type: "minor" },
  "Azamgarh": { lat: 26.067, lng: 83.183, type: "minor" },
  "Mau": { lat: 25.943, lng: 83.558, type: "minor" },
  "Ballia": { lat: 25.762, lng: 84.150, type: "minor" },
  "Deoria": { lat: 26.502, lng: 83.780, type: "minor" },
  "Kushinagar": { lat: 26.740, lng: 83.892, type: "minor" },
  "Maharajganj": { lat: 27.131, lng: 83.540, type: "minor" },
  "Basti": { lat: 26.799, lng: 82.728, type: "minor" },
  "Ambedkar Nagar": { lat: 26.464, lng: 82.533, type: "minor" },
  "Rampur": { lat: 28.819, lng: 79.025, type: "minor" },
  "Budaun": { lat: 28.043, lng: 79.125, type: "minor" },
  "Shahjahanpur": { lat: 27.883, lng: 79.908, type: "minor" },
  "Pilibhit": { lat: 28.632, lng: 79.804, type: "minor" },
  "Muzaffarnagar": { lat: 29.472, lng: 77.703, type: "minor" },
  "Hapur": { lat: 28.730, lng: 77.776, type: "minor" },
  "Bulandshahr": { lat: 28.407, lng: 77.850, type: "minor" },
  "Khurja": { lat: 28.252, lng: 77.852, type: "minor" },
  "Dadri": { lat: 28.551, lng: 77.553, type: "minor" },
  "Shamli": { lat: 29.444, lng: 77.310, type: "minor" },
  "Deoband": { lat: 29.694, lng: 77.679, type: "minor" },
  "Roorkee": { lat: 29.865, lng: 77.888, type: "minor" },

  // Bihar
  "Patna": { lat: 25.594, lng: 85.137, type: "major" },
  "Gaya": { lat: 24.797, lng: 85.007, type: "major" },
  "Muzaffarpur": { lat: 26.121, lng: 85.364, type: "major" },
  "Bhagalpur": { lat: 25.244, lng: 86.972, type: "major" },
  "Darbhanga": { lat: 26.152, lng: 85.898, type: "major" },
  "Arrah": { lat: 25.556, lng: 84.662, type: "minor" },
  "Aurangabad (Bihar)": { lat: 24.752, lng: 84.374, type: "minor" },
  "Sasaram": { lat: 24.949, lng: 84.031, type: "minor" },
  "Dehri": { lat: 24.909, lng: 84.182, type: "minor" },
  "Buxar": { lat: 25.565, lng: 83.980, type: "minor" },
  "Chapra": { lat: 25.779, lng: 84.747, type: "minor" },
  "Hajipur": { lat: 25.687, lng: 85.210, type: "minor" },
  "Sitamarhi": { lat: 26.600, lng: 85.490, type: "minor" },
  "Motihari": { lat: 26.651, lng: 84.918, type: "minor" },
  "Bettiah": { lat: 26.800, lng: 84.502, type: "minor" },
  "Siwan": { lat: 26.220, lng: 84.358, type: "minor" },
  "Begusarai": { lat: 25.418, lng: 86.130, type: "minor" },
  "Munger": { lat: 25.376, lng: 86.474, type: "minor" },
  "Khagaria": { lat: 25.501, lng: 86.464, type: "minor" },
  "Saharsa": { lat: 25.878, lng: 86.601, type: "minor" },
  "Purnia": { lat: 25.777, lng: 87.474, type: "minor" },
  "Katihar": { lat: 25.548, lng: 87.576, type: "minor" },
  "Kishanganj": { lat: 26.099, lng: 87.941, type: "minor" },
  "Madhubani": { lat: 26.352, lng: 86.072, type: "minor" },
  "Samastipur": { lat: 25.862, lng: 85.779, type: "minor" },
  "Jehanabad": { lat: 25.213, lng: 84.985, type: "minor" },
  "Nalanda": { lat: 25.136, lng: 85.443, type: "minor" },
  "Nawada": { lat: 24.888, lng: 85.541, type: "minor" },
  "Jamui": { lat: 24.924, lng: 86.221, type: "minor" },

  // Jharkhand / West Bengal
  "Ranchi": { lat: 23.344, lng: 85.309, type: "major" },
  "Jamshedpur": { lat: 22.805, lng: 86.203, type: "major" },
  "Dhanbad": { lat: 23.795, lng: 86.434, type: "major" },
  "Bokaro": { lat: 23.669, lng: 85.990, type: "major" },
  "Hazaribagh": { lat: 23.990, lng: 85.361, type: "minor" },
  "Giridih": { lat: 24.185, lng: 86.309, type: "minor" },
  "Deoghar": { lat: 24.480, lng: 86.693, type: "minor" },
  "Dumka": { lat: 24.271, lng: 87.247, type: "minor" },
  "Koderma": { lat: 24.464, lng: 85.596, type: "minor" },
  "Chatra": { lat: 24.207, lng: 84.876, type: "minor" },
  "Kolkata": { lat: 22.572, lng: 88.363, type: "major" },
  "Howrah": { lat: 22.586, lng: 88.311, type: "major" },
  "Durgapur": { lat: 23.553, lng: 87.320, type: "major" },
  "Asansol": { lat: 23.683, lng: 86.983, type: "major" },
  "Siliguri": { lat: 26.717, lng: 88.427, type: "major" },
  "Bardhaman": { lat: 23.232, lng: 87.853, type: "minor" },
  "Kharagpur": { lat: 22.331, lng: 87.323, type: "minor" },
  "Midnapore": { lat: 22.423, lng: 87.318, type: "minor" },
  "Bankura": { lat: 23.230, lng: 87.068, type: "minor" },
  "Purulia": { lat: 23.332, lng: 86.363, type: "minor" },
  "Malda": { lat: 25.001, lng: 88.135, type: "minor" },
  "Raiganj": { lat: 25.615, lng: 88.123, type: "minor" },
  "Balurghat": { lat: 25.219, lng: 88.775, type: "minor" },
  "Cooch Behar": { lat: 26.321, lng: 89.446, type: "minor" },
  "Jalpaiguri": { lat: 26.543, lng: 88.729, type: "minor" },
  "Krishnanagar": { lat: 23.402, lng: 88.502, type: "minor" },
  "Kalyani": { lat: 22.975, lng: 88.434, type: "minor" },
  "Barasat": { lat: 22.722, lng: 88.479, type: "minor" },
  "Barrackpore": { lat: 22.757, lng: 88.374, type: "minor" },
  "Haldia": { lat: 22.065, lng: 88.070, type: "minor" },
  "Tamluk": { lat: 22.296, lng: 87.920, type: "minor" },

  // Odisha
  "Bhubaneswar": { lat: 20.296, lng: 85.824, type: "major" },
  "Cuttack": { lat: 20.462, lng: 85.883, type: "major" },
  "Rourkela": { lat: 22.260, lng: 84.853, type: "major" },
  "Berhampur": { lat: 19.314, lng: 84.789, type: "major" },
  "Sambalpur": { lat: 21.466, lng: 83.970, type: "major" },
  "Puri": { lat: 19.812, lng: 85.831, type: "minor" },
  "Balasore": { lat: 21.494, lng: 86.932, type: "minor" },
  "Baripada": { lat: 21.931, lng: 86.724, type: "minor" },
  "Bhadrak": { lat: 21.054, lng: 86.496, type: "minor" },
  "Jajpur": { lat: 20.845, lng: 86.335, type: "minor" },
  "Kendrapara": { lat: 20.500, lng: 86.420, type: "minor" },
  "Paradip": { lat: 20.316, lng: 86.612, type: "minor" },
  "Jagatsinghpur": { lat: 20.254, lng: 86.173, type: "minor" },
  "Khurda": { lat: 20.182, lng: 85.608, type: "minor" },
  "Nayagarh": { lat: 20.128, lng: 85.095, type: "minor" },
  "Phulbani": { lat: 20.479, lng: 84.231, type: "minor" },
  "Bolangir": { lat: 20.702, lng: 83.484, type: "minor" },
  "Boudh": { lat: 20.839, lng: 84.323, type: "minor" },
  "Bargarh": { lat: 21.336, lng: 83.620, type: "minor" },
  "Jharsuguda": { lat: 21.854, lng: 84.006, type: "minor" },
  "Sundargarh": { lat: 22.117, lng: 84.030, type: "minor" },
  "Keonjhar": { lat: 21.629, lng: 85.581, type: "minor" },
  "Dhenkanal": { lat: 20.659, lng: 85.598, type: "minor" },
  "Angul": { lat: 20.840, lng: 85.099, type: "minor" },

  // Andhra Pradesh / Telangana
  "Hyderabad": { lat: 17.385, lng: 78.486, type: "major" },
  "Visakhapatnam": { lat: 17.686, lng: 83.218, type: "major" },
  "Vijayawada": { lat: 16.506, lng: 80.648, type: "major" },
  "Guntur": { lat: 16.307, lng: 80.437, type: "major" },
  "Warangal": { lat: 17.977, lng: 79.600, type: "major" },
  "Nellore": { lat: 14.442, lng: 79.986, type: "major" },
  "Kurnool": { lat: 15.828, lng: 78.037, type: "major" },
  "Rajahmundry": { lat: 17.005, lng: 81.778, type: "major" },
  "Tirupati": { lat: 13.629, lng: 79.419, type: "major" },
  "Karimnagar": { lat: 18.438, lng: 79.128, type: "minor" },
  "Nizamabad": { lat: 18.672, lng: 78.094, type: "minor" },
  "Khammam": { lat: 17.247, lng: 80.150, type: "minor" },
  "Nalgonda": { lat: 17.056, lng: 79.267, type: "minor" },
  "Mahbubnagar": { lat: 16.737, lng: 77.988, type: "minor" },
  "Adilabad": { lat: 19.666, lng: 78.531, type: "minor" },
  "Ongole": { lat: 15.503, lng: 80.045, type: "minor" },
  "Kadapa": { lat: 14.467, lng: 78.823, type: "minor" },
  "Anantapur": { lat: 14.682, lng: 77.600, type: "minor" },
  "Chittoor": { lat: 13.215, lng: 79.101, type: "minor" },
  "Eluru": { lat: 16.711, lng: 81.094, type: "minor" },
  "Bhimavaram": { lat: 16.544, lng: 81.521, type: "minor" },
  "Srikakulam": { lat: 18.296, lng: 83.898, type: "minor" },
  "Vizianagaram": { lat: 18.116, lng: 83.411, type: "minor" },
  "Narasaraopet": { lat: 16.234, lng: 80.053, type: "minor" },
  "Tenali": { lat: 16.243, lng: 80.641, type: "minor" },
  "Hindupur": { lat: 13.829, lng: 77.491, type: "minor" },
  "Guntakal": { lat: 15.169, lng: 77.367, type: "minor" },
  "Adoni": { lat: 15.628, lng: 77.274, type: "minor" },
  "Nandyal": { lat: 15.478, lng: 78.483, type: "minor" },
  "Proddatur": { lat: 14.750, lng: 78.549, type: "minor" },
  "Bhongir": { lat: 17.513, lng: 78.882, type: "minor" },
  "Suryapet": { lat: 17.141, lng: 79.621, type: "minor" },
  "Miryalaguda": { lat: 16.868, lng: 79.566, type: "minor" },
  "Siddipet": { lat: 18.102, lng: 78.851, type: "minor" },
  "Bodhan": { lat: 18.666, lng: 77.889, type: "minor" },
  "Nirmal": { lat: 19.101, lng: 78.344, type: "minor" },
  "Mancherial": { lat: 18.870, lng: 79.461, type: "minor" },
  "Bhadrachalam": { lat: 17.669, lng: 80.893, type: "minor" },

  // Tamil Nadu
  "Chennai": { lat: 13.082, lng: 80.270, type: "major" },
  "Coimbatore": { lat: 11.017, lng: 76.965, type: "major" },
  "Madurai": { lat: 9.925, lng: 78.120, type: "major" },
  "Tiruchirappalli": { lat: 10.790, lng: 78.705, type: "major" },
  "Salem": { lat: 11.658, lng: 78.158, type: "major" },
  "Tirunelveli": { lat: 8.727, lng: 77.695, type: "major" },
  "Tiruppur": { lat: 11.103, lng: 77.341, type: "major" },
  "Erode": { lat: 11.341, lng: 77.728, type: "major" },
  "Vellore": { lat: 12.916, lng: 79.133, type: "major" },
  "Thoothukudi": { lat: 8.764, lng: 78.135, type: "major" },
  "Dharmapuri": { lat: 12.128, lng: 78.158, type: "minor" },
  "Krishnagiri": { lat: 12.519, lng: 78.214, type: "minor" },
  "Hosur": { lat: 12.738, lng: 77.826, type: "minor" },
  "Ambur": { lat: 12.793, lng: 78.714, type: "minor" },
  "Ranipet": { lat: 12.926, lng: 79.333, type: "minor" },
  "Kanchipuram": { lat: 12.836, lng: 79.706, type: "minor" },
  "Chengalpattu": { lat: 12.693, lng: 79.977, type: "minor" },
  "Villupuram": { lat: 11.939, lng: 79.493, type: "minor" },
  "Cuddalore": { lat: 11.748, lng: 79.768, type: "minor" },
  "Pondicherry": { lat: 11.933, lng: 79.830, type: "minor" },
  "Nagapattinam": { lat: 10.766, lng: 79.842, type: "minor" },
  "Thanjavur": { lat: 10.787, lng: 79.139, type: "minor" },
  "Kumbakonam": { lat: 10.961, lng: 79.388, type: "minor" },
  "Dindigul": { lat: 10.363, lng: 77.974, type: "minor" },
  "Karur": { lat: 10.957, lng: 78.080, type: "minor" },
  "Namakkal": { lat: 11.219, lng: 78.166, type: "minor" },
  "Ooty": { lat: 11.413, lng: 76.695, type: "minor" },
  "Pollachi": { lat: 10.657, lng: 77.008, type: "minor" },
  "Palani": { lat: 10.451, lng: 77.525, type: "minor" },
  "Sivakasi": { lat: 9.456, lng: 77.797, type: "minor" },
  "Virudhunagar": { lat: 9.582, lng: 77.957, type: "minor" },
  "Ramanathapuram": { lat: 9.371, lng: 78.830, type: "minor" },
  "Sivaganga": { lat: 9.843, lng: 78.481, type: "minor" },
  "Pudukkottai": { lat: 10.381, lng: 78.820, type: "minor" },
  "Tiruvannur": { lat: 10.771, lng: 79.638, type: "minor" },
  "Ariyalur": { lat: 11.141, lng: 79.079, type: "minor" },
  "Perambalur": { lat: 11.232, lng: 78.881, type: "minor" },
  "Kallakurichi": { lat: 11.737, lng: 78.958, type: "minor" },

  // Karnataka
  "Bangalore": { lat: 12.971, lng: 77.594, type: "major" },
  "Mysore": { lat: 12.295, lng: 76.644, type: "major" },
  "Hubli": { lat: 15.364, lng: 75.124, type: "major" },
  "Dharwad": { lat: 15.458, lng: 75.008, type: "major" },
  "Mangalore": { lat: 12.914, lng: 74.856, type: "major" },
  "Belgaum": { lat: 15.853, lng: 74.497, type: "major" },
  "Gulbarga": { lat: 17.329, lng: 76.820, type: "major" },
  "Davanagere": { lat: 14.464, lng: 75.921, type: "major" },
  "Bellary": { lat: 15.140, lng: 76.921, type: "major" },
  "Bijapur": { lat: 16.829, lng: 75.715, type: "major" },
  "Shimoga": { lat: 13.930, lng: 75.563, type: "minor" },
  "Tumkur": { lat: 13.342, lng: 77.101, type: "minor" },
  "Raichur": { lat: 16.203, lng: 77.357, type: "minor" },
  "Bidar": { lat: 17.914, lng: 77.535, type: "minor" },
  "Hospet": { lat: 15.269, lng: 76.388, type: "minor" },
  "Gadag": { lat: 15.430, lng: 75.625, type: "minor" },
  "Koppal": { lat: 15.352, lng: 76.154, type: "minor" },
  "Chitradurga": { lat: 14.230, lng: 76.399, type: "minor" },
  "Hassan": { lat: 13.009, lng: 76.097, type: "minor" },
  "Mandya": { lat: 12.524, lng: 76.896, type: "minor" },
  "Chikmagalur": { lat: 13.317, lng: 75.775, type: "minor" },
  "Udupi": { lat: 13.341, lng: 74.742, type: "minor" },
  "Srinagar (Karnataka)": { lat: 13.387, lng: 74.750, type: "minor" },
  "Kolar": { lat: 13.136, lng: 78.129, type: "minor" },
  "Chikballapur": { lat: 13.433, lng: 77.731, type: "minor" },
  "Bagalkot": { lat: 16.180, lng: 75.696, type: "minor" },
  "Yadgir": { lat: 16.769, lng: 77.138, type: "minor" },
  "Chamarajanagar": { lat: 11.921, lng: 76.944, type: "minor" },
  "Kodagu": { lat: 12.421, lng: 75.739, type: "minor" },
  "Haveri": { lat: 14.793, lng: 75.401, type: "minor" },
  "Sirsi": { lat: 14.620, lng: 74.836, type: "minor" },
  "Karwar": { lat: 14.809, lng: 74.129, type: "minor" },
  "Mudhol": { lat: 16.340, lng: 75.286, type: "minor" },
  "Ilkal": { lat: 15.958, lng: 76.118, type: "minor" },
  "Indi": { lat: 17.171, lng: 75.959, type: "minor" },
  "Shorapur": { lat: 16.517, lng: 76.759, type: "minor" },
  "Lingsugur": { lat: 16.182, lng: 76.517, type: "minor" },
  "Sindhanur": { lat: 15.768, lng: 76.752, type: "minor" },
  "Gangavati": { lat: 15.431, lng: 76.532, type: "minor" },

  // Kerala
  "Kochi": { lat: 9.931, lng: 76.267, type: "major" },
  "Thiruvananthapuram": { lat: 8.524, lng: 76.936, type: "major" },
  "Kozhikode": { lat: 11.258, lng: 75.780, type: "major" },
  "Thrissur": { lat: 10.527, lng: 76.214, type: "major" },
  "Kollam": { lat: 8.884, lng: 76.591, type: "major" },
  "Palakkad": { lat: 10.775, lng: 76.654, type: "major" },
  "Malappuram": { lat: 11.073, lng: 76.074, type: "minor" },
  "Kannur": { lat: 11.868, lng: 75.371, type: "minor" },
  "Alappuzha": { lat: 9.496, lng: 76.330, type: "minor" },
  "Kottayam": { lat: 9.590, lng: 76.524, type: "minor" },
  "Idukki": { lat: 9.849, lng: 76.972, type: "minor" },
  "Pathanamthitta": { lat: 9.268, lng: 76.787, type: "minor" },
  "Kasaragod": { lat: 12.498, lng: 74.989, type: "minor" },
  "Manjeri": { lat: 11.119, lng: 76.121, type: "minor" },
  "Tirur": { lat: 10.913, lng: 75.924, type: "minor" },
  "Ponnani": { lat: 10.773, lng: 75.920, type: "minor" },
  "Chalakudy": { lat: 10.300, lng: 76.328, type: "minor" },
  "Angamaly": { lat: 10.196, lng: 76.386, type: "minor" },
  "Perumbavoor": { lat: 10.107, lng: 76.479, type: "minor" },
  "Aluva": { lat: 10.107, lng: 76.352, type: "minor" },
  "Varkala": { lat: 8.733, lng: 76.716, type: "minor" },
  "Attingal": { lat: 8.691, lng: 76.812, type: "minor" },
  "Neyyattinkara": { lat: 8.399, lng: 77.087, type: "minor" },
  "Kanhangad": { lat: 12.330, lng: 75.100, type: "minor" },
  "Thalassery": { lat: 11.748, lng: 75.492, type: "minor" },
  "Vatakara": { lat: 11.601, lng: 75.589, type: "minor" },
  "Kalpetta": { lat: 11.608, lng: 76.083, type: "minor" },

  // Madhya Pradesh
  "Indore": { lat: 22.719, lng: 75.857, type: "major" },
  "Bhopal": { lat: 23.259, lng: 77.412, type: "major" },
  "Jabalpur": { lat: 23.181, lng: 79.986, type: "major" },
  "Gwalior": { lat: 26.218, lng: 78.182, type: "major" },
  "Ujjain": { lat: 23.182, lng: 75.784, type: "major" },
  "Sagar": { lat: 23.838, lng: 78.739, type: "minor" },
  "Rewa": { lat: 24.531, lng: 81.296, type: "minor" },
  "Satna": { lat: 24.601, lng: 80.832, type: "minor" },
  "Dewas": { lat: 22.964, lng: 76.054, type: "minor" },
  "Shivpuri": { lat: 25.424, lng: 77.666, type: "minor" },
  "Morena": { lat: 26.493, lng: 77.998, type: "minor" },
  "Bhind": { lat: 26.558, lng: 78.790, type: "minor" },
  "Chhindwara": { lat: 22.057, lng: 78.938, type: "minor" },
  "Vidisha": { lat: 23.525, lng: 77.808, type: "minor" },
  "Raisen": { lat: 23.328, lng: 77.789, type: "minor" },
  "Sehore": { lat: 23.202, lng: 77.086, type: "minor" },
  "Harda": { lat: 22.341, lng: 77.096, type: "minor" },
  "Hoshangabad": { lat: 22.748, lng: 77.727, type: "minor" },
  "Itarsi": { lat: 22.615, lng: 77.762, type: "minor" },
  "Betul": { lat: 21.900, lng: 77.900, type: "minor" },
  "Balaghat": { lat: 21.807, lng: 80.185, type: "minor" },
  "Mandla": { lat: 22.598, lng: 80.376, type: "minor" },
  "Katni": { lat: 23.833, lng: 80.399, type: "minor" },
  "Damoh": { lat: 23.832, lng: 79.441, type: "minor" },
  "Panna": { lat: 24.718, lng: 80.186, type: "minor" },
  "Tikamgarh": { lat: 24.743, lng: 78.831, type: "minor" },
  "Chhatarpur": { lat: 24.918, lng: 79.589, type: "minor" },
  "Khajuraho": { lat: 24.852, lng: 79.934, type: "minor" },
  "Mandsaur": { lat: 24.073, lng: 75.074, type: "minor" },
  "Ratlam": { lat: 23.333, lng: 75.038, type: "minor" },
  "Neemuch": { lat: 24.476, lng: 74.869, type: "minor" },
  "Shajapur": { lat: 23.427, lng: 76.276, type: "minor" },
  "Agar": { lat: 23.710, lng: 76.022, type: "minor" },
  "Rajgarh": { lat: 24.016, lng: 76.714, type: "minor" },
  "Guna": { lat: 24.648, lng: 77.314, type: "minor" },
  "Ashok Nagar": { lat: 24.577, lng: 77.731, type: "minor" },
  "Narsinghpur": { lat: 22.949, lng: 79.195, type: "minor" },
  "Seoni": { lat: 22.087, lng: 79.541, type: "minor" },
  "Dindori": { lat: 22.945, lng: 81.071, type: "minor" },
  "Sidhi": { lat: 24.417, lng: 81.878, type: "minor" },
  "Singrauli": { lat: 24.199, lng: 82.673, type: "minor" },
  "Shahdol": { lat: 23.300, lng: 81.357, type: "minor" },
  "Umaria": { lat: 23.522, lng: 80.838, type: "minor" },
  "Anuppur": { lat: 23.105, lng: 81.685, type: "minor" },

  // Chhattisgarh
  "Raipur": { lat: 21.250, lng: 81.629, type: "major" },
  "Bhilai": { lat: 21.209, lng: 81.428, type: "major" },
  "Bilaspur": { lat: 22.075, lng: 82.148, type: "major" },
  "Durg": { lat: 21.191, lng: 81.283, type: "minor" },
  "Korba": { lat: 22.346, lng: 82.686, type: "minor" },
  "Raigarh": { lat: 21.899, lng: 83.395, type: "minor" },
  "Jagdalpur": { lat: 19.072, lng: 82.035, type: "minor" },
  "Rajnandgaon": { lat: 21.097, lng: 81.030, type: "minor" },
  "Ambikapur": { lat: 23.119, lng: 83.196, type: "minor" },
  "Mahasamund": { lat: 21.106, lng: 82.099, type: "minor" },

  // North East
  "Guwahati": { lat: 26.144, lng: 91.736, type: "major" },
  "Dibrugarh": { lat: 27.481, lng: 94.912, type: "major" },
  "Silchar": { lat: 24.829, lng: 92.798, type: "major" },
  "Jorhat": { lat: 26.751, lng: 94.203, type: "minor" },
  "Tezpur": { lat: 26.630, lng: 92.800, type: "minor" },
  "Nagaon": { lat: 26.350, lng: 92.683, type: "minor" },
  "Bongaigaon": { lat: 26.479, lng: 90.557, type: "minor" },
  "Dhubri": { lat: 26.019, lng: 89.980, type: "minor" },
  "Kokrajhar": { lat: 26.400, lng: 90.270, type: "minor" },

  // J&K / Himachal / Uttarakhand
  "Srinagar": { lat: 34.083, lng: 74.797, type: "major" },
  "Jammu": { lat: 32.726, lng: 74.857, type: "major" },
  "Shimla": { lat: 31.104, lng: 77.167, type: "major" },
  "Manali": { lat: 32.241, lng: 77.189, type: "minor" },
  "Dharamsala": { lat: 32.220, lng: 76.319, type: "minor" },
  "Mandi": { lat: 31.709, lng: 76.932, type: "minor" },
  "Solan": { lat: 30.909, lng: 77.096, type: "minor" },
  "Dehradun": { lat: 30.316, lng: 78.032, type: "major" },
  "Haridwar": { lat: 29.946, lng: 78.161, type: "major" },
  "Rishikesh": { lat: 30.087, lng: 78.269, type: "minor" },
  "Mussoorie": { lat: 30.460, lng: 78.075, type: "minor" },
  "Haldwani": { lat: 29.215, lng: 79.513, type: "minor" },
  "Nainital": { lat: 29.381, lng: 79.463, type: "minor" },
  "Rudrapur": { lat: 28.984, lng: 79.392, type: "minor" },
  "Kashipur": { lat: 29.208, lng: 78.958, type: "minor" },
  "Kotdwar": { lat: 29.745, lng: 78.527, type: "minor" },
  "Almora": { lat: 29.597, lng: 79.659, type: "minor" },
  "Pithoragarh": { lat: 29.582, lng: 80.217, type: "minor" },
  "Uttarkashi": { lat: 30.726, lng: 78.442, type: "minor" },
};

const CITY_NAMES = Object.keys(ROUTE_MAP);

function dist(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function getCitiesAlongRoute(from, to) {
  const a = ROUTE_MAP[from];
  const b = ROUTE_MAP[to];
  if (!a || !b) return [];
  const totalDist = dist(a, b);
  // Use a corridor: detour tolerance scales with distance but capped
  const corridor = Math.min(totalDist * 0.18, 120);
  return CITY_NAMES.filter((city) => {
    if (city === from || city === to) return false;
    const c = ROUTE_MAP[city];
    const detour = dist(a, c) + dist(c, b) - totalDist;
    return detour < corridor;
  }).sort((x, y) => dist(a, ROUTE_MAP[x]) - dist(a, ROUTE_MAP[y]));
}

// --- Seed data ----------------------------------------------------------------
const SEED_LOADS = [
  { id: 1, truckerName: "Rajan Yadav", truckType: "Heavy Truck (10-20 Ton)", from: "Mumbai", to: "Delhi", date: "2026-03-10", via: getCitiesAlongRoute("Mumbai", "Delhi"), contact: "98765-43210" },
  { id: 2, truckerName: "Suresh Kumar", truckType: "Trailer / Container (20+ Ton)", from: "Delhi", to: "Kolkata", date: "2026-03-09", via: getCitiesAlongRoute("Delhi", "Kolkata"), contact: "87654-32109" },
  { id: 3, truckerName: "Amol Patil", truckType: "Medium Truck (5-10 Ton)", from: "Ahmedabad", to: "Chennai", date: "2026-03-11", via: getCitiesAlongRoute("Ahmedabad", "Chennai"), contact: "76543-21098" },
  { id: 4, truckerName: "Pradeep Singh", truckType: "Flatbed", from: "Jaipur", to: "Hyderabad", date: "2026-03-12", via: getCitiesAlongRoute("Jaipur", "Hyderabad"), contact: "65432-10987" },
];

// --- Components ---------------------------------------------------------------
const CitySelect = ({ label, value, onChange, exclude }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase" }}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "#111827",
        color: "#f9fafb",
        border: "2px solid #374151",
        borderRadius: 6,
        padding: "10px 14px",
        fontSize: 15,
        fontFamily: "'Barlow', sans-serif",
        cursor: "pointer",
        outline: "none",
        transition: "border-color .2s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#f59e0b")}
      onBlur={(e) => (e.target.style.borderColor = "#374151")}
    >
      <option value="">- Select City -</option>
      {CITY_NAMES.filter((c) => c !== exclude).map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  </div>
);

const Badge = ({ children, color = "#f59e0b" }) => (
  <span style={{
    background: color + "22",
    color,
    border: `1px solid ${color}55`,
    borderRadius: 4,
    padding: "2px 8px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
  }}>{children}</span>
);

const LoadCard = ({ load, highlight, currentUser, onRevealAttempt }) => {
  const [showContact, setShowContact] = useState(false);
  const isOwner = currentUser && currentUser.name === load.truckerName;

  const handleContactClick = () => {
    if (showContact) { setShowContact(false); return; }
    const allowed = onRevealAttempt ? onRevealAttempt(load) : true;
    if (allowed) setShowContact(true);
  };

  return (
  <div style={{
    background: highlight ? "#1c1408" : "#111827",
    border: `2px solid ${highlight ? "#f59e0b" : "#1f2937"}`,
    borderRadius: 12,
    padding: "18px 20px",
    marginBottom: 14,
    position: "relative",
    transition: "all .2s",
    boxShadow: highlight ? "0 0 20px #f59e0b33" : "none",
  }}>
    {highlight && (
      <div style={{ position: "absolute", top: -10, right: 14 }}>
        <Badge color="#22c55e">✓ MATCH</Badge>
      </div>
    )}
    {isOwner && (
      <div style={{ position: "absolute", top: -10, left: 14 }}>
        <Badge color="#a78bfa">YOUR POST</Badge>
      </div>
    )}
    <div className="tr-load-top">
      <div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>
          {load.from} <span style={{ color: "#f59e0b" }}>→</span> {load.to}
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
          🚛 {load.truckType || load.truckNo || "-"} &nbsp;|&nbsp; 👤 {load.truckerName}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: 14 }}>📅 {load.date}</div>
        <div style={{ marginTop: 8 }}>
          {showContact ? (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#065f4633", border: "1px solid #22c55e55",
              borderRadius: 7, padding: "7px 14px",
            }}>
              <span style={{ fontSize: 16 }}>📞</span>
              <span style={{ color: "#6ee7b7", fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>{load.contact || "-"}</span>
              <button onClick={() => setShowContact(false)} style={{
                background: "none", border: "none", color: "#4b5563",
                cursor: "pointer", fontSize: 14, padding: "0 2px", lineHeight: 1,
              }}>✕</button>
            </div>
          ) : (
            <button onClick={handleContactClick} style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "#1f2937", color: "#f9fafb",
              border: "2px solid #374151", borderRadius: 7,
              padding: "7px 16px", fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Barlow', sans-serif",
              transition: "all .15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.color = "#111827"; e.currentTarget.style.borderColor = "#22c55e"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1f2937"; e.currentTarget.style.color = "#f9fafb"; e.currentTarget.style.borderColor = "#374151"; }}
            >
              📞 Contact Number
            </button>
          )}
        </div>
      </div>
    </div>
    {load.via.length > 0 && (
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, letterSpacing: 1 }}>VIA ({load.via.length} cities):</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {load.via.map((c) => {
            const cityData = ROUTE_MAP[c];
            const isMajor = cityData && cityData.type === "major";
            return <Badge key={c} color={isMajor ? "#f59e0b" : "#60a5fa"}>{isMajor ? "★ " : ""}{c}</Badge>;
          })}
        </div>
      </div>
    )}
  </div>
  );
}

// --- Pages --------------------------------------------------------------------
function PostLoad({ loads, setLoads, truckerName, currentUser }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [truckType, setTruckType] = useState("");
  const [contact, setContact] = useState("");
  const [postDuration, setPostDuration] = useState(0);
  const [notifyByEmail, setNotifyByEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handlePreview = () => {
    if (!from || !to || !date) return;
    const via = getCitiesAlongRoute(from, to);
    setPreview({ from, to, date, via, truckerName, truckType, contact, postDuration });
  };

  const handleSubmit = () => {
    const via = getCitiesAlongRoute(from, to);
    if (editingId) {
      setLoads(loads.map(l => l.id === editingId
        ? { ...l, truckType, from, to, date, via, contact, postDuration: Number(postDuration), notifyByEmail, ownerEmail: currentUser?.email || "" }
        : l
      ));
      setEditingId(null);
    } else {
      const newLoad = {
        id: Date.now(),
        truckerName, truckType, from, to, date, via, contact,
        postDuration: Number(postDuration),
        notifyByEmail,
        ownerEmail: currentUser?.email || "",
        postedAt: Date.now(),
      };
      setLoads([newLoad, ...loads]);
    }
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFrom(""); setTo(""); setDate(""); setTruckType(""); setContact(""); setPostDuration(0); setNotifyByEmail(false); setPreview(null); }, 3000);
  };

  const handleEdit = (load) => {
    setEditingId(load.id);
    setFrom(load.from);
    setTo(load.to);
    setDate(load.date);
    setTruckType(load.truckType || "");
    setContact(load.contact || "");
    setPostDuration(load.postDuration || 0);
    setNotifyByEmail(load.notifyByEmail || false);
    setPreview(null);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFrom(""); setTo(""); setDate(""); setTruckType(""); setContact(""); setPostDuration(0); setNotifyByEmail(false); setPreview(null);
  };

  const handleDeleteFromEdit = () => {
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
    setLoads(loads.filter(l => l.id !== editingId));
    handleCancelEdit();
  };

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: 56 }}>✅</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: "#22c55e", fontFamily: "'Barlow Condensed', sans-serif", marginTop: 12 }}>
        {editingId ? "Post Updated Successfully!" : "Load Posted Successfully!"}
      </div>
      <div style={{ color: "#9ca3af", marginTop: 8 }}>
        {editingId ? "Your load post has been updated." : "Other truckers can now find your empty truck on this route."}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", margin: 0 }}>
          {editingId ? "EDIT EMPTY LOAD" : "POST EMPTY LOAD"}
        </h2>
        <p style={{ color: "#6b7280", marginTop: 6, fontSize: 14 }}>Share your empty truck details so others can book space on your route.</p>
        {editingId && (
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, background: "#1c1408", border: "1px solid #f59e0b44", borderRadius: 8, padding: "10px 14px" }}>
            <span style={{ fontSize: 16 }}>✏️</span>
            <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 600 }}>Editing an existing post — make your changes and save.</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button onClick={handleDeleteFromEdit}
                style={{ background: "#7f1d1d33", border: "1px solid #dc262666", color: "#f87171", borderRadius: 6, padding: "4px 12px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}
                onMouseEnter={e => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#7f1d1d33"; e.currentTarget.style.color = "#f87171"; }}>
                🗑️ Delete
              </button>
              <button onClick={handleCancelEdit}
                style={{ background: "none", border: "1px solid #374151", color: "#6b7280", borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="tr-grid-2" style={{ marginBottom: 16 }}>
        <CitySelect label="Start City" value={from} onChange={setFrom} exclude={to} />
        <CitySelect label="Drop City" value={to} onChange={setTo} exclude={from} />
      </div>
      <div className="tr-grid-2" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase" }}>Start Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            style={{ background: "#111827", color: "#f9fafb", border: "2px solid #374151", borderRadius: 6, padding: "10px 14px", fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: "none" }}
            onFocus={(e) => (e.target.style.borderColor = "#f59e0b")}
            onBlur={(e) => (e.target.style.borderColor = "#374151")}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase" }}>Truck Type</label>
          <select value={truckType} onChange={(e) => setTruckType(e.target.value)}
            style={{ background: "#111827", color: truckType ? "#f9fafb" : "#6b7280", border: "2px solid #374151", borderRadius: 6, padding: "10px 14px", fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: "none", cursor: "pointer" }}
            onFocus={(e) => (e.target.style.borderColor = "#f59e0b")}
            onBlur={(e) => (e.target.style.borderColor = "#374151")}
          >
            <option value="">- Select Type -</option>
            <option value="Mini Truck (1-2 Ton)">Mini Truck (1-2 Ton)</option>
            <option value="Light Commercial (2-5 Ton)">Light Commercial (2-5 Ton)</option>
            <option value="Medium Truck (5-10 Ton)">Medium Truck (5-10 Ton)</option>
            <option value="Heavy Truck (10-20 Ton)">Heavy Truck (10-20 Ton)</option>
            <option value="Trailer / Container (20+ Ton)">Trailer / Container (20+ Ton)</option>
            <option value="Flatbed">Flatbed</option>
            <option value="Tanker">Tanker</option>
            <option value="Refrigerated / Reefer">Refrigerated / Reefer</option>
            <option value="Open Body">Open Body</option>
            <option value="Single Car Carrier">Single Car Carrier</option>
            <option value="Tipper / Dumper">Tipper / Dumper</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase" }}>Contact Number</label>
          <input type="text" placeholder="e.g. 98765-43210" value={contact} onChange={(e) => setContact(e.target.value)}
            style={{ background: "#111827", color: "#f9fafb", border: "2px solid #374151", borderRadius: 6, padding: "10px 14px", fontSize: 15, fontFamily: "'Barlow', sans-serif", outline: "none" }}
            onFocus={(e) => (e.target.style.borderColor = "#f59e0b")}
            onBlur={(e) => (e.target.style.borderColor = "#374151")}
          />
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase" }}>
              Extra Days After Start Date (optional)
            </label>
            <span style={{
              background: postDuration === 0 ? "#1f2937" : "#1c1408",
              color: postDuration === 0 ? "#6b7280" : "#f59e0b",
              border: `1px solid ${postDuration === 0 ? "#374151" : "#f59e0b55"}`,
              borderRadius: 20, padding: "2px 12px", fontSize: 12, fontWeight: 700,
            }}>
              {postDuration === 0 ? "None — expires on Start Date" : `+${postDuration} day${postDuration > 1 ? "s" : ""} buffer`}
            </span>
          </div>
          <input
            type="range" min="0" max="20" value={postDuration}
            onChange={(e) => setPostDuration(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#f59e0b", cursor: "pointer" }}
          />
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            {postDuration === 0
              ? "Post will automatically disappear on the Start Date."
              : `Post will stay visible for ${postDuration} extra day${postDuration > 1 ? "s" : ""} after the Start Date — useful if your travel may be delayed.`}
          </div>
        </div>
      </div>

      {/* Email Notification Checkbox */}
      <div style={{ marginBottom: 20, background: "#111827", border: `2px solid ${notifyByEmail ? "#f59e0b55" : "#1f2937"}`, borderRadius: 10, padding: "14px 16px", transition: "border-color .2s" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
          <div style={{ position: "relative", flexShrink: 0, marginTop: 2 }}>
            <input
              type="checkbox"
              checked={notifyByEmail}
              onChange={e => setNotifyByEmail(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: "#f59e0b", cursor: "pointer" }}
            />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: notifyByEmail ? "#f59e0b" : "#f9fafb" }}>
              📧 Notify me by email when someone tries to contact me
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4, lineHeight: 1.5 }}>
              {notifyByEmail
                ? `You will receive an email at ${currentUser?.email || "your signup email"} whenever someone exceeds their daily reveal limit but still tries to view your contact number. Their name and mobile number will be included so you can call them back.`
                : "Tick this box to receive an email alert with the caller's details when they exceed their daily contact reveal limit."}
            </div>
          </div>
        </label>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <button onClick={handlePreview} disabled={!from || !to || !date}
          style={{ flex: 1, padding: "12px 20px", background: "#1f2937", color: "#f9fafb", border: "2px solid #374151", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Barlow', sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>
          Preview Route
        </button>
        <button onClick={handleSubmit} disabled={!from || !to || !date}
          style={{ flex: 2, padding: "12px 20px", background: from && to && date ? "#f59e0b" : "#374151", color: from && to && date ? "#111827" : "#6b7280", border: "none", borderRadius: 8, fontWeight: 800, fontSize: 15, cursor: from && to && date ? "pointer" : "not-allowed", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 2, textTransform: "uppercase" }}>
          {editingId ? "💾 Save Changes" : "🚛 Post Empty Load"}
        </button>
      </div>

      {preview && (
        <div style={{ background: "#0f172a", border: "2px solid #f59e0b44", borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", marginBottom: 12, textTransform: "uppercase" }}>Route Preview</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif" }}>
            {preview.from} <span style={{ color: "#f59e0b" }}>→</span> {preview.to}
          </div>
          <div style={{ color: "#9ca3af", fontSize: 13, marginTop: 4 }}>📅 {preview.date}</div>
          {preview.truckType && <div style={{ color: "#a78bfa", fontSize: 13, marginTop: 4 }}>🚛 {preview.truckType}</div>}
          {preview.via.length > 0 ? (
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
                <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1 }}>
                  CITIES ALONG ROUTE ({preview.via.length})
                </div>
                <span style={{ fontSize: 11, color: "#f59e0b" }}>★ Major city</span>
                <span style={{ fontSize: 11, color: "#60a5fa" }}>• Minor city/town</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {preview.via.map((c) => {
                  const cityData = ROUTE_MAP[c];
                  const isMajor = cityData && cityData.type === "major";
                  return <Badge key={c} color={isMajor ? "#f59e0b" : "#60a5fa"}>{isMajor ? "★ " : ""}{c}</Badge>;
                })}
              </div>
            </div>
          ) : (
            <div style={{ color: "#6b7280", marginTop: 10, fontSize: 13 }}>No major intermediate cities detected for this route.</div>
          )}
        </div>
      )}

      {/* My Posts list at bottom */}
      <MyPostsPanel loads={loads} truckerName={truckerName} onEdit={handleEdit} />

    </div>
  );
}

function FindLoad({ loads, currentUser, onRevealAttempt, revealCount, revealLimit, timeLeft }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (!from || !to) return;
    const matches = loads.filter((l) => {
      if (!isLive(l)) return false; // hide expired posts
      const dateMatch = !date || l.date === date;
      const routeMatch =
        (l.from === from && l.to === to) ||
        (l.from === from && l.via.includes(to)) ||
        (l.via.includes(from) && l.to === to) ||
        (l.via.includes(from) && l.via.includes(to));
      return routeMatch && dateMatch;
    });
    setResults(matches);
    setSearched(true);
  };

  const allLoads = searched ? loads.map((l) => ({ ...l, isMatch: results.some((r) => r.id === l.id) })) : [];

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", margin: 0 }}>FIND EMPTY LOAD</h2>
        <p style={{ color: "#6b7280", marginTop: 6, fontSize: 14 }}>Search for empty trucks passing through your route.</p>
      </div>

      <div style={{ background: "#111827", border: "2px solid #1f2937", borderRadius: 12, padding: "20px", marginBottom: 24 }}>
        <div className="tr-grid-3" style={{ marginBottom: 16 }}>
          <CitySelect label="From" value={from} onChange={setFrom} exclude={to} />
          <CitySelect label="To" value={to} onChange={setTo} exclude={from} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase" }}>Date (optional)</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              style={{ background: "#0d1117", color: "#f9fafb", border: "2px solid #374151", borderRadius: 6, padding: "10px 14px", fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: "none" }}
            />
          </div>
        </div>
        <button onClick={handleSearch} disabled={!from || !to}
          style={{ width: "100%", padding: "13px", background: from && to ? "#f59e0b" : "#374151", color: from && to ? "#111827" : "#6b7280", border: "none", borderRadius: 8, fontWeight: 800, fontSize: 15, cursor: from && to ? "pointer" : "not-allowed", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 2, textTransform: "uppercase" }}>
          🔍 Search Empty Trucks
        </button>
      </div>

      {!searched && (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#4b5563" }}>
          <div style={{ fontSize: 48 }}>🔍</div>
          <div style={{ marginTop: 12, fontSize: 16, color: "#6b7280" }}>Select your route above to find available empty trucks.</div>
        </div>
      )}

      {searched && (
        <>
          <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 14, color: "#9ca3af" }}>
              Found <span style={{ color: results.length > 0 ? "#22c55e" : "#f87171", fontWeight: 700 }}>{results.length}</span> matching truck{results.length !== 1 ? "s" : ""} for <span style={{ color: "#f9fafb", fontWeight: 600 }}>{from} ? {to}</span>
            </div>
            <div style={{ fontSize: 12, background: revealCount >= revealLimit ? "#7f1d1d33" : "#1f2937", border: `1px solid ${revealCount >= revealLimit ? "#dc262644" : "#374151"}`, borderRadius: 6, padding: "5px 12px", color: revealCount >= revealLimit ? "#f87171" : "#9ca3af" }}>
              {revealCount >= revealLimit
                ? `📞 Limit reached · resets in ${formatTimeLeft(timeLeft)}`
                : `📞 ${revealCount}/${revealLimit} reveals used today`}
            </div>
          </div>

          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "56px 20px", background: "#111827", border: "2px dashed #1f2937", borderRadius: 12 }}>
              <div style={{ fontSize: 48 }}>🔍</div>
              <div style={{ marginTop: 14, fontSize: 18, fontWeight: 700, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif" }}>No Empty Trucks Found</div>
              <div style={{ marginTop: 8, fontSize: 14, color: "#6b7280" }}>No trucks are currently available on the <strong style={{ color: "#9ca3af" }}>{from} ? {to}</strong> route{date ? ` on ${date}` : ""}.</div>
              <div style={{ marginTop: 6, fontSize: 13, color: "#4b5563" }}>Try searching without a date filter, or check back later.</div>
            </div>
          ) : (
            results.map((l) => (
              <LoadCard key={l.id} load={l} highlight={true} currentUser={currentUser} onRevealAttempt={onRevealAttempt} />
            ))
          )}
        </>
      )}
    </div>
  );
}

function AdminPanel({ loads, setLoads, currentUser }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const today = new Date().toISOString().slice(0, 10);

  // -- Stats --
  const stats = {
    total: loads.length,
    today: loads.filter(l => l.date === today).length,
    upcoming: loads.filter(l => l.date > today).length,
    past: loads.filter(l => l.date < today).length,
    cities: [...new Set(loads.flatMap(l => [l.from, l.to]))].length,
    truckers: [...new Set(loads.map(l => l.truckerName))].length,
  };

  // -- Truck type breakdown --
  const truckTypeCounts = loads.reduce((acc, l) => {
    const t = l.truckType || "Unknown";
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  // -- Top routes --
  const routeCounts = loads.reduce((acc, l) => {
    const key = `${l.from} → ${l.to}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const topRoutes = Object.entries(routeCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // -- Top truckers --
  const truckerCounts = loads.reduce((acc, l) => {
    acc[l.truckerName] = (acc[l.truckerName] || 0) + 1;
    return acc;
  }, {});
  const topTruckers = Object.entries(truckerCounts).sort((a, b) => b[1] - a[1]);

  // -- Filtered loads --
  const filteredLoads = loads.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.truckerName.toLowerCase().includes(q) || l.from.toLowerCase().includes(q) || l.to.toLowerCase().includes(q) || (l.truckType || "").toLowerCase().includes(q);
    const matchType = !filterType || l.truckType === filterType;
    const matchDate = !filterDate || l.date === filterDate;
    return matchSearch && matchType && matchDate;
  });

  const handleDelete = (id) => {
    setLoads(prev => prev.filter(l => l.id !== id));
    setConfirmDelete(null);
  };

  const ADMIN_TABS = [
    { key: "dashboard", label: "📊 Dashboard" },
    { key: "loads", label: "📦 All Loads" },
    { key: "truckers", label: "👤 Truckers" },
    { key: "analytics", label: "📈 Analytics" },
  ];

  const s = { background: "#111827", border: "2px solid #1f2937", borderRadius: 12, padding: "20px 18px" };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Admin Nav Tabs */}
      <div className="tr-tabs" style={{ gap: 4, marginBottom: 28, paddingBottom: 4 }}>
        {ADMIN_TABS.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            padding: "9px 16px", borderRadius: 8, whiteSpace: "nowrap",
            background: activeTab === t.key ? "#f59e0b" : "#111827",
            color: activeTab === t.key ? "#111827" : "#9ca3af",
            border: activeTab === t.key ? "none" : "2px solid #1f2937",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
            fontFamily: "'Barlow', sans-serif", letterSpacing: 0.5, transition: "all .2s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* -- DASHBOARD -- */}
      {activeTab === "dashboard" && (
        <div>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", margin: "0 0 4px", letterSpacing: 1 }}>ADMIN DASHBOARD</h2>
            <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>Overview of all activity on TruckRoute network.</p>
          </div>

          {/* Stat Cards */}
          <div className="tr-grid-stats" style={{ marginBottom: 24 }}>
            {[
              { label: "Total Loads", value: stats.total, icon: "🚛", color: "#f59e0b" },
              { label: "Posted Today", value: stats.today, icon: "📅", color: "#22c55e" },
              { label: "Upcoming", value: stats.upcoming, icon: "🕐", color: "#60a5fa" },
              { label: "Past Loads", value: stats.past, icon: "📦", color: "#6b7280" },
              { label: "Active Cities", value: stats.cities, icon: "🏙️", color: "#a78bfa" },
              { label: "Truckers", value: stats.truckers, icon: "👤", color: "#f472b6" },
            ].map(s => (
              <div key={s.label} style={{ background: "#111827", border: `2px solid ${s.color}28`, borderRadius: 12, padding: "18px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 28, lineHeight: 1 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.color, fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 3 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent loads */}
          <div style={{ ...s, marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase", marginBottom: 16 }}>Recent Loads</div>
            {loads.length === 0 ? (
              <div style={{ color: "#4b5563", textAlign: "center", padding: "24px 0" }}>No loads posted yet.</div>
            ) : (
              <div style={{ overflowX: "auto", margin: "0 -4px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 480 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1f2937" }}>
                    {["Trucker", "Route", "Truck Type", "Date", "Status"].map(h => (
                      <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: "#6b7280", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loads.slice(0, 8).map(l => {
                    const status = l.date === today ? "today" : l.date > today ? "upcoming" : "past";
                    const statusColor = status === "today" ? "#22c55e" : status === "upcoming" ? "#60a5fa" : "#6b7280";
                    return (
                      <tr key={l.id} style={{ borderBottom: "1px solid #0d1117" }}>
                        <td style={{ padding: "10px", color: "#f9fafb", fontWeight: 600 }}>{l.truckerName}</td>
                        <td style={{ padding: "10px", color: "#f9fafb" }}>{l.from} <span style={{ color: "#f59e0b" }}>→</span> {l.to}</td>
                        <td style={{ padding: "10px", color: "#9ca3af" }}>{l.truckType || "-"}</td>
                        <td style={{ padding: "10px", color: "#9ca3af" }}>{l.date}</td>
                        <td style={{ padding: "10px" }}>
                          <span style={{ background: statusColor + "22", color: statusColor, border: `1px solid ${statusColor}44`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* -- ALL LOADS -- */}
      {activeTab === "loads" && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", margin: "0 0 4px" }}>ALL LOADS</h2>
            <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>Manage and monitor all posted empty loads.</p>
          </div>

          {/* Filters */}
          <div className="tr-grid-3" style={{ marginBottom: 20 }}>
            <input type="text" placeholder="🔍  Search by trucker, city, truck type..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ background: "#111827", color: "#f9fafb", border: "2px solid #1f2937", borderRadius: 8, padding: "10px 14px", fontSize: 14, fontFamily: "'Barlow', sans-serif", outline: "none" }}
              onFocus={e => e.target.style.borderColor = "#f59e0b"} onBlur={e => e.target.style.borderColor = "#1f2937"}
            />
            <select value={filterType} onChange={e => setFilterType(e.target.value)}
              style={{ background: "#111827", color: filterType ? "#f9fafb" : "#6b7280", border: "2px solid #1f2937", borderRadius: 8, padding: "10px 14px", fontSize: 13, fontFamily: "'Barlow', sans-serif", outline: "none", cursor: "pointer" }}>
              <option value="">All Types</option>
              {["Mini Truck (1-2 Ton)", "Light Commercial (2-5 Ton)", "Medium Truck (5-10 Ton)", "Heavy Truck (10-20 Ton)", "Trailer / Container (20+ Ton)", "Flatbed", "Tanker", "Refrigerated / Reefer", "Open Body", "Single Car Carrier", "Tipper / Dumper"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
              style={{ background: "#111827", color: "#f9fafb", border: "2px solid #1f2937", borderRadius: 8, padding: "10px 14px", fontSize: 13, fontFamily: "'Barlow', sans-serif", outline: "none" }}
            />
          </div>

          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 14 }}>
            Showing <span style={{ color: "#f9fafb", fontWeight: 700 }}>{filteredLoads.length}</span> of {loads.length} loads
            {(search || filterType || filterDate) && (
              <button onClick={() => { setSearch(""); setFilterType(""); setFilterDate(""); }}
                style={{ marginLeft: 12, color: "#f59e0b", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}>
                ? Clear filters
              </button>
            )}
          </div>

          {filteredLoads.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px", background: "#111827", borderRadius: 12, color: "#4b5563" }}>
              <div style={{ fontSize: 40 }}>📦</div>
              <div style={{ marginTop: 12 }}>No loads match your filters.</div>
            </div>
          ) : (
            <div className="tr-table-wrap" style={{ background: "#111827" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#0d1117", borderBottom: "2px solid #1f2937" }}>
                    {["Trucker", "Route", "Via (count)", "Truck Type", "Date", "Status", "Contact", "Action"].map(h => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#6b7280", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...filteredLoads].sort((a, b) => (b.postedAt || 0) - (a.postedAt || 0)).map((l, i) => {
                    const { text: liveText, color: liveColor, expired } = expiryLabel(l);
                    return (
                      <tr key={l.id} style={{ borderBottom: "1px solid #0d1117", background: i % 2 === 0 ? "transparent" : "#0d111766", opacity: expired ? 0.7 : 1 }}>
                        <td style={{ padding: "12px 14px", color: "#f9fafb", fontWeight: 600 }}>{l.truckerName}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ color: "#f9fafb" }}>{l.from}</span>
                          <span style={{ color: "#f59e0b", margin: "0 4px" }}>→</span>
                          <span style={{ color: "#f9fafb" }}>{l.to}</span>
                        </td>
                        <td style={{ padding: "12px 14px", color: "#60a5fa" }}>{l.via.length} cities</td>
                        <td style={{ padding: "12px 14px", color: "#9ca3af" }}>{l.truckType || "-"}</td>
                        <td style={{ padding: "12px 14px", color: "#d1d5db" }}>{l.date}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{
                            display: "inline-block", padding: "3px 10px", borderRadius: 20,
                            fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                            background: expired ? "#1f293799" : "#14532d55",
                            color: liveColor, border: `1px solid ${liveColor}44`,
                          }}>{expired ? "Expired" : "Live"}</span>
                        </td>
                        <td style={{ padding: "12px 14px", color: "#6ee7b7", fontFamily: "monospace", fontSize: 12 }}>{l.contact || "-"}</td>
                        <td style={{ padding: "12px 14px" }}>
                          {confirmDelete === l.id ? (
                            <div style={{ display: "flex", gap: 6 }}>
                              <button onClick={() => handleDelete(l.id)} style={{ padding: "4px 10px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 4, fontSize: 11, cursor: "pointer", fontWeight: 700 }}>Confirm</button>
                              <button onClick={() => setConfirmDelete(null)} style={{ padding: "4px 10px", background: "#374151", color: "#9ca3af", border: "none", borderRadius: 4, fontSize: 11, cursor: "pointer" }}>Cancel</button>
                            </div>
                          ) : (
                            <button onClick={() => setConfirmDelete(l.id)} style={{ padding: "4px 12px", background: "#7f1d1d33", color: "#f87171", border: "1px solid #7f1d1d66", borderRadius: 4, fontSize: 11, cursor: "pointer", fontWeight: 700 }}>✕ Delete</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* -- TRUCKERS -- */}
      {activeTab === "truckers" && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", margin: "0 0 4px" }}>TRUCKERS</h2>
            <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>All registered truckers and their activity.</p>
          </div>

          {topTruckers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px", background: "#111827", borderRadius: 12, color: "#4b5563" }}>
              <div style={{ fontSize: 40 }}>📦</div>
              <div style={{ marginTop: 12 }}>No truckers have posted loads yet.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {topTruckers.map(([name, count], i) => {
                const truckerLoads = loads.filter(l => l.truckerName === name);
                const latestLoad = truckerLoads.sort((a, b) => b.date.localeCompare(a.date))[0];
                const truckTypes = [...new Set(truckerLoads.map(l => l.truckType).filter(Boolean))];
                return (
                  <div key={name} style={{ background: "#111827", border: "2px solid #1f2937", borderRadius: 12, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#f59e0b22", border: "2px solid #f59e0b44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🚛"}
                    </div>
                    <div style={{ flex: 1, minWidth: 140 }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif" }}>{name}</div>
                      {latestLoad && (
                        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>
                          Last route: {latestLoad.from} → {latestLoad.to} on {latestLoad.date}
                        </div>
                      )}
                      {truckTypes.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                          {truckTypes.map(t => <Badge key={t} color="#a78bfa">{t}</Badge>)}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: "#f59e0b", fontFamily: "'Barlow Condensed', sans-serif", lineHeight: 1 }}>{count}</div>
                      <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: 1, textTransform: "uppercase" }}>Load{count !== 1 ? "s" : ""} posted</div>
                    </div>
                    {latestLoad?.contact && (
                      <div style={{ fontSize: 13, color: "#6ee7b7", fontFamily: "monospace", background: "#065f4622", border: "1px solid #065f4644", borderRadius: 6, padding: "6px 10px" }}>
                        📞 {latestLoad.contact}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* -- ANALYTICS -- */}
      {activeTab === "analytics" && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", margin: "0 0 4px" }}>ANALYTICS</h2>
            <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>Insights into routes, truck types, and network activity.</p>
          </div>

          <div className="tr-analytics-grid" style={{ gap: 20 }}>
            {/* Truck Type Breakdown */}
            <div style={{ ...s }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase", marginBottom: 16 }}>Truck Type Breakdown</div>
              {Object.keys(truckTypeCounts).length === 0 ? (
                <div style={{ color: "#4b5563", fontSize: 13 }}>No data yet.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {Object.entries(truckTypeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => {
                    const pct = Math.round((count / loads.length) * 100);
                    return (
                      <div key={type}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 12, color: "#d1d5db" }}>{type}</span>
                          <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700 }}>{count} ({pct}%)</span>
                        </div>
                        <div style={{ height: 6, background: "#1f2937", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #f59e0b, #fbbf24)", borderRadius: 3, transition: "width .5s ease" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Top Routes */}
            <div style={{ ...s }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#60a5fa", textTransform: "uppercase", marginBottom: 16 }}>Top Routes</div>
              {topRoutes.length === 0 ? (
                <div style={{ color: "#4b5563", fontSize: 13 }}>No data yet.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {topRoutes.map(([route, count], i) => {
                    const pct = Math.round((count / loads.length) * 100);
                    const colors = ["#f59e0b", "#60a5fa", "#22c55e", "#a78bfa", "#f472b6"];
                    return (
                      <div key={route}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 12, color: "#d1d5db" }}>
                            <span style={{ color: colors[i], fontWeight: 700, marginRight: 6 }}>#{i + 1}</span>{route}
                          </span>
                          <span style={{ fontSize: 12, color: colors[i], fontWeight: 700 }}>{count}x</span>
                        </div>
                        <div style={{ height: 6, background: "#1f2937", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: colors[i], borderRadius: 3 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Load Status Split */}
            <div style={{ ...s }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#22c55e", textTransform: "uppercase", marginBottom: 16 }}>Load Status Split</div>
              {loads.length === 0 ? (
                <div style={{ color: "#4b5563", fontSize: 13 }}>No data yet.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Posted Today", value: stats.today, color: "#22c55e" },
                    { label: "Upcoming", value: stats.upcoming, color: "#60a5fa" },
                    { label: "Past", value: stats.past, color: "#6b7280" },
                  ].map(item => {
                    const pct = loads.length ? Math.round((item.value / loads.length) * 100) : 0;
                    return (
                      <div key={item.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 12, color: "#d1d5db" }}>{item.label}</span>
                          <span style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>{item.value} ({pct}%)</span>
                        </div>
                        <div style={{ height: 6, background: "#1f2937", borderRadius: 3 }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: item.color, borderRadius: 3 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Top Cities */}
            <div style={{ ...s }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#a78bfa", textTransform: "uppercase", marginBottom: 16 }}>Most Active Cities</div>
              {loads.length === 0 ? (
                <div style={{ color: "#4b5563", fontSize: 13 }}>No data yet.</div>
              ) : (() => {
                const cityCount = loads.flatMap(l => [l.from, l.to]).reduce((acc, c) => { acc[c] = (acc[c] || 0) + 1; return acc; }, {});
                const topCities = Object.entries(cityCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
                const max = topCities[0]?.[1] || 1;
                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {topCities.map(([city, count]) => (
                      <div key={city}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 12, color: "#d1d5db" }}>📍 {city}</span>
                          <span style={{ fontSize: 12, color: "#a78bfa", fontWeight: 700 }}>{count} loads</span>
                        </div>
                        <div style={{ height: 6, background: "#1f2937", borderRadius: 3 }}>
                          <div style={{ height: "100%", width: `${Math.round((count / max) * 100)}%`, background: "linear-gradient(90deg, #7c3aed, #a78bfa)", borderRadius: 3 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Auth Screen --------------------------------------------------------------
function LoginScreen({ onLogin }) {
  const [authType, setAuthType] = useState("trucker"); // trucker | admin
  const [mode, setMode]         = useState("login");   // login | signup
  const [fullName, setFullName] = useState("");
  const [email, setEmail]       = useState("");
  const [contact, setContact]   = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const ADMIN_EMAIL    = "admin@truckroute.in";
  const ADMIN_PASSWORD = "Admin@TruckRoute2024";

  const inputStyle = {
    width: "100%", background: "#0d1117", color: "#f9fafb",
    border: "2px solid #374151", borderRadius: 8,
    padding: "12px 14px", fontSize: 15,
    fontFamily: "'Barlow', sans-serif", outline: "none",
    boxSizing: "border-box", marginBottom: 14,
  };

  const handleLogin = async () => {
    setError(""); setLoading(true);
    try {
      if (authType === "admin") {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          onLogin({ name: "Admin", role: "admin", contact: "" });
        } else {
          setError("Invalid admin credentials.");
        }
        setLoading(false); return;
      }
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) { setError(authError.message); setLoading(false); return; }
      const { data: profile } = await supabase
        .from("profiles").select("*").eq("user_id", data.user.id).single();
      onLogin({
        name:    profile?.full_name || email,
        role:    "trucker",
        contact: profile?.contact   || "",
        email,
      });
    } catch (e) { setError("Something went wrong. Please try again."); }
    setLoading(false);
  };

  const handleSignup = async () => {
    setError(""); setLoading(true);
    if (!fullName || !email || !password || !contact) {
      setError("Please fill in all fields."); setLoading(false); return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters."); setLoading(false); return;
    }
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email, password,
        options: { data: { full_name: fullName } },
      });
      if (authError) { setError(authError.message); setLoading(false); return; }
      await supabase.from("profiles").insert({
        user_id:   data.user.id,
        full_name: fullName,
        contact:   contact,
        role:      "trucker",
      });
      onLogin({ name: fullName, role: "trucker", contact, email });
    } catch (e) { setError("Something went wrong. Please try again."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#030712", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow', sans-serif", padding: 20 }}>
      {/* Decorative bg */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, #f59e0b08 0%, transparent 70%)", top: -200, left: -200 }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #1d4ed808 0%, transparent 70%)", bottom: -100, right: -100 }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#ffffff04 1px, transparent 1px), linear-gradient(90deg, #ffffff04 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>🚛</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 4, textTransform: "uppercase" }}>
            TRUCK<span style={{ color: "#f59e0b" }}>ROUTE</span>
          </div>
          <div style={{ fontSize: 12, color: "#6b7280", letterSpacing: 3, textTransform: "uppercase", marginTop: 4 }}>Empty Load Network</div>
        </div>

        {/* Trucker / Admin toggle */}
        <div style={{ display: "flex", background: "#111827", border: "2px solid #1f2937", borderRadius: 10, padding: 4, marginBottom: 16 }}>
          {["trucker", "admin"].map(t => (
            <button key={t} onClick={() => { setAuthType(t); setError(""); setMode("login"); }}
              style={{ flex: 1, padding: "10px", background: authType === t ? "#f59e0b" : "transparent", color: authType === t ? "#111827" : "#9ca3af", border: "none", borderRadius: 7, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 2, textTransform: "uppercase", transition: "all .2s" }}>
              {t === "trucker" ? "🚛 Trucker" : "⚙️ Admin"}
            </button>
          ))}
        </div>

        {/* Login / Sign Up toggle ? truckers only */}
        {authType === "trucker" && (
          <div style={{ display: "flex", background: "#111827", border: "2px solid #1f2937", borderRadius: 10, padding: 4, marginBottom: 24 }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                style={{ flex: 1, padding: "9px", background: mode === m ? "#1f2937" : "transparent", color: mode === m ? "#f9fafb" : "#6b7280", border: "none", borderRadius: 7, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Barlow', sans-serif", transition: "all .2s" }}>
                {m === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>
        )}

        {/* Form */}
        <div style={{ background: "#111827", border: "2px solid #1f2937", borderRadius: 14, padding: "28px 24px" }}>

          {/* Sign Up extra fields */}
          {mode === "signup" && authType === "trucker" && (
            <>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase", marginBottom: 6 }}>Full Name</label>
              <input style={inputStyle} placeholder="e.g. Rajan Yadav"
                value={fullName} onChange={e => setFullName(e.target.value)} />
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase", marginBottom: 6 }}>Mobile Number</label>
              <input style={inputStyle} placeholder="e.g. 98765-43210"
                value={contact} onChange={e => setContact(e.target.value)} />
            </>
          )}

          {/* Email */}
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase", marginBottom: 6 }}>Email Address</label>
          <input style={inputStyle} type="email"
            placeholder={authType === "admin" ? "admin@truckroute.in" : "you@email.com"}
            value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (mode === "login" ? handleLogin() : handleSignup())} />

          {/* Password */}
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#f59e0b", textTransform: "uppercase", marginBottom: 6 }}>Password</label>
          <input style={inputStyle} type="password"
            placeholder={mode === "signup" ? "Min 6 characters" : "Your password"}
            value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (mode === "login" ? handleLogin() : handleSignup())} />

          {/* Error */}
          {error && (
            <div style={{ color: "#f87171", fontSize: 13, marginBottom: 14, background: "#7f1d1d22", border: "1px solid #7f1d1d", borderRadius: 6, padding: "8px 12px" }}>{error}</div>
          )}

          {/* Submit */}
          <button
            onClick={mode === "signup" && authType === "trucker" ? handleSignup : handleLogin}
            disabled={loading}
            style={{ width: "100%", padding: "14px", background: loading ? "#374151" : "#f59e0b", color: loading ? "#6b7280" : "#111827", border: "none", borderRadius: 8, fontWeight: 900, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 3, textTransform: "uppercase" }}>
            {loading ? "Please wait..." : mode === "signup" ? "Create Account ->" : "Login ->"}
          </button>

          {authType === "trucker" && mode === "login" && (
            <div style={{ marginTop: 14, color: "#4b5563", fontSize: 12, textAlign: "center" }}>
              New trucker? Click <span style={{ color: "#f59e0b", cursor: "pointer" }} onClick={() => setMode("signup")}>Sign Up</span> to create an account.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- My Posts Panel -----------------------------------------------------------
function MyPostsPanel({ loads, truckerName, onEdit }) {
  const myLoads = loads
    .filter(l => l.truckerName === truckerName)
    .sort((a, b) => (b.postedAt || 0) - (a.postedAt || 0));

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1 }}>MY POSTS</div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>All your empty load posts - newest first</div>
        </div>
        {myLoads.length > 0 && (
          <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
            <span style={{ background: "#14532d55", color: "#22c55e", border: "1px solid #22c55e44", borderRadius: 20, padding: "3px 12px", fontWeight: 700 }}>
              {myLoads.filter(l => isLive(l)).length} Live
            </span>
            <span style={{ background: "#1f293799", color: "#6b7280", border: "1px solid #37415144", borderRadius: 20, padding: "3px 12px", fontWeight: 700 }}>
              {myLoads.filter(l => !isLive(l)).length} Expired
            </span>
          </div>
        )}
      </div>

      {myLoads.length === 0 ? (
        <div style={{ textAlign: "center", padding: "32px 20px", background: "#111827", border: "2px dashed #1f2937", borderRadius: 12, color: "#4b5563" }}>
          <div style={{ fontSize: 36 }}>📋</div>
          <div style={{ marginTop: 10, fontSize: 14 }}>You haven't posted any loads yet. Use the form above to post your first empty truck.</div>
        </div>
      ) : (
        <div className="tr-table-wrap" style={{ background: "#111827" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 500 }}>
            <thead>
              <tr style={{ background: "#0d1117", borderBottom: "2px solid #1f2937" }}>
                {["Route", "Truck Type", "Travel Date", "Buffer Days", "Status", "Posted On", "Action"].map(h => (
                  <th key={h} style={{ padding: "11px 14px", textAlign: "left", color: "#6b7280", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myLoads.map((l, i) => {
                const { color: liveColor, expired } = expiryLabel(l);
                return (
                  <tr key={l.id} style={{ borderBottom: "1px solid #0d1117", background: i % 2 === 0 ? "transparent" : "#0d111766", opacity: expired ? 0.6 : 1 }}>
                    <td style={{ padding: "11px 14px", whiteSpace: "nowrap" }}>
                      <span style={{ color: "#f9fafb", fontWeight: 600 }}>{l.from}</span>
                      <span style={{ color: "#f59e0b", margin: "0 5px" }}>→</span>
                      <span style={{ color: "#f9fafb", fontWeight: 600 }}>{l.to}</span>
                    </td>
                    <td style={{ padding: "11px 14px", color: "#9ca3af", whiteSpace: "nowrap" }}>{l.truckType || "-"}</td>
                    <td style={{ padding: "11px 14px", color: "#d1d5db", whiteSpace: "nowrap" }}>{l.date}</td>
                    <td style={{ padding: "11px 14px", color: "#a78bfa", whiteSpace: "nowrap" }}>
                      {l.postDuration > 0 ? `+${l.postDuration}d` : "None"}
                    </td>
                    <td style={{ padding: "11px 14px", whiteSpace: "nowrap" }}>
                      <span style={{
                        display: "inline-block", padding: "3px 10px", borderRadius: 20,
                        fontSize: 11, fontWeight: 700,
                        background: expired ? "#1f293799" : "#14532d55",
                        color: liveColor, border: `1px solid ${liveColor}44`,
                      }}>{expired ? "Expired" : "Live"}</span>
                    </td>
                    <td style={{ padding: "11px 14px", color: "#6b7280", fontSize: 12, whiteSpace: "nowrap" }}>
                      {l.postedAt ? new Date(l.postedAt).toLocaleDateString("en-IN") : "-"}
                    </td>
                    <td style={{ padding: "11px 14px", whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => onEdit(l)}
                        style={{
                          padding: "5px 14px", background: "#1e3a5f", color: "#60a5fa",
                          border: "1px solid #60a5fa55", borderRadius: 6,
                          fontSize: 12, fontWeight: 700, cursor: "pointer",
                          fontFamily: "'Barlow', sans-serif", transition: "all .15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#1e3a5f"; e.currentTarget.style.color = "#60a5fa"; }}
                      >
                        ✏️ Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Enquiries Panel ----------------------------------------------------------
function EnquiriesPanel({ enquiries, truckerName }) {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", margin: "0 0 6px", letterSpacing: 1 }}>
          📬 ENQUIRIES
        </h2>
        <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>
          Users who tried to contact you after reaching their reveal limit. Call them back!
        </p>
      </div>

      {enquiries.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 20px", background: "#111827", border: "2px dashed #1f2937", borderRadius: 14 }}>
          <div style={{ fontSize: 48 }}>🔍</div>
          <div style={{ marginTop: 14, fontSize: 18, fontWeight: 700, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif" }}>No Enquiries Yet</div>
          <div style={{ marginTop: 8, fontSize: 14, color: "#6b7280" }}>When someone tries to contact you after using their 2 free reveals, their details will appear here.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[...enquiries].reverse().map((e, i) => (
            <div key={e.id} style={{
              background: "#111827",
              border: "2px solid #22c55e33",
              borderRadius: 12,
              padding: "18px 20px",
              position: "relative",
              boxShadow: "0 0 16px #22c55e11",
            }}>
              {/* New badge for latest */}
              {i === 0 && (
                <div style={{ position: "absolute", top: -10, right: 14 }}>
                  <Badge color="#22c55e">🆕 NEW</Badge>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                {/* Inquirer info */}
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif" }}>
                    👤 {e.inquirerName}
                  </div>
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#065f4622", border: "1px solid #22c55e44", borderRadius: 7, padding: "6px 12px", width: "fit-content" }}>
                      <span style={{ fontSize: 15 }}>📞</span>
                      <span style={{ color: "#6ee7b7", fontWeight: 700, fontSize: 15 }}>{e.inquirerContact}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>
                      Interested in your load: <span style={{ color: "#f9fafb", fontWeight: 600 }}>{e.loadFrom} → {e.loadTo}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      🚛 {e.truckType}
                    </div>
                  </div>
                </div>
                {/* Date / time */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, color: "#f59e0b", fontWeight: 700 }}>📅 {e.date}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>🕐 {e.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {enquiries.length > 0 && (
        <div style={{ marginTop: 16, fontSize: 12, color: "#4b5563", textAlign: "center" }}>
          Showing {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"} - enquirer's reveal limit resets every 24 hours
        </div>
      )}
    </div>
  );
}

// --- Main App -----------------------------------------------------------------
// --- Reveal quota helpers (24-hour reset via localStorage) -------------------
const QUOTA_KEY = "truckroute_reveal_quota";
const REVEAL_LIMIT = 2;

function getQuota() {
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    if (!raw) return { count: 0, resetAt: Date.now() + 24 * 60 * 60 * 1000 };
    const q = JSON.parse(raw);
    if (Date.now() > q.resetAt) {
      // 24 hours passed - reset
      const fresh = { count: 0, resetAt: Date.now() + 24 * 60 * 60 * 1000 };
      localStorage.setItem(QUOTA_KEY, JSON.stringify(fresh));
      return fresh;
    }
    return q;
  } catch { return { count: 0, resetAt: Date.now() + 24 * 60 * 60 * 1000 }; }
}

function saveQuota(q) {
  try { localStorage.setItem(QUOTA_KEY, JSON.stringify(q)); } catch {}
}

function msUntilReset() {
  try {
    const raw = localStorage.getItem(QUOTA_KEY);
    if (!raw) return 24 * 60 * 60 * 1000;
    const q = JSON.parse(raw);
    return Math.max(0, q.resetAt - Date.now());
  } catch { return 0; }
}

function formatTimeLeft(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

// Returns true if the load is still within its visibility window
// Post expires at end of Start Date + optional buffer days
function isLive(load) {
  if (!load.date) return true;
  const [y, m, d] = load.date.split("-").map(Number);
  const buffer = load.postDuration || 0;
  const expiresAt = new Date(y, m - 1, d + 1 + buffer).getTime();
  return Date.now() < expiresAt;
}

// Returns label text and colour e.g. "Live - 3d left" or "Expired 1d ago"
function expiryLabel(load) {
  if (!load.date) return { text: "Live", color: "#22c55e" };
  const [y, m, d] = load.date.split("-").map(Number);
  const buffer = load.postDuration || 0;
  const expiresAt = new Date(y, m - 1, d + 1 + buffer).getTime();
  const diff = expiresAt - Date.now();
  if (diff <= 0) {
    const ago = Math.abs(diff);
    const days = Math.floor(ago / 86400000);
    const hrs  = Math.floor((ago % 86400000) / 3600000);
    return { text: days > 0 ? `Expired ${days}d ago` : `Expired ${hrs}h ago`, color: "#6b7280", expired: true };
  }
  const days = Math.floor(diff / 86400000);
  const hrs  = Math.floor((diff % 86400000) / 3600000);
  const timeStr = days > 0 ? `${days}d ${hrs}h left` : `${hrs}h left`;
  return { text: `Live - ${timeStr}`, color: "#22c55e" };
}

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("post");
  const [loads, setLoads] = useState(SEED_LOADS);
  const [revealCount, setRevealCount] = useState(() => getQuota().count);
  const [enquiries, setEnquiries] = useState([]);
  const [limitPopup, setLimitPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => msUntilReset());

  // Tick every minute to update the "resets in X" display
  useEffect(() => {
    const interval = setInterval(() => {
      const q = getQuota(); // also auto-resets if 24h passed
      setRevealCount(q.count);
      setTimeLeft(msUntilReset());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Send email notification via Supabase Edge Function
  const sendEmailNotification = async (load, inquirer, type) => {
    if (!load.notifyByEmail || !load.ownerEmail) return;
    try {
      await supabase.functions.invoke("send-contact-email", {
        body: {
          ownerEmail: load.ownerEmail,
          ownerName: load.truckerName,
          loadFrom: load.from,
          loadTo: load.to,
          loadDate: load.date,
          inquirerName: inquirer.name,
          inquirerContact: inquirer.contact || "Not provided",
          type, // "reveal" or "limit"
          timestamp: new Date().toLocaleString("en-IN"),
        },
      });
    } catch (e) {
      console.warn("Email notification failed:", e);
    }
  };

  // Called by LoadCard when user taps "Contact Number"
  const handleRevealAttempt = (load) => {
    const q = getQuota();
    if (q.count >= REVEAL_LIMIT) {
      const now = new Date();
      setEnquiries(prev => [...prev, {
        id: Date.now(),
        inquirerName: user.name,
        inquirerContact: user.contact || "Not provided",
        loadId: load.id,
        loadFrom: load.from,
        loadTo: load.to,
        loadTruckerName: load.truckerName,
        truckType: load.truckType || "-",
        date: now.toLocaleDateString("en-IN"),
        time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      }]);
      // Send email — limit exceeded case
      sendEmailNotification(load, user, "limit");
      setLimitPopup(true);
      return false;
    }
    const updated = { ...q, count: q.count + 1 };
    saveQuota(updated);
    setRevealCount(updated.count);
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab("post");
  };

  if (!user) return <LoginScreen onLogin={setUser} />;

  // Count new enquiries for the logged-in trucker
  const myEnquiries = enquiries.filter(e => e.loadTruckerName === user.name);

  return (
    <div style={{ minHeight: "100vh", background: "#030712", fontFamily: "'Barlow', sans-serif", color: "#f9fafb" }}>
      {/* Google Fonts + Responsive CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Barlow+Condensed:wght@700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }

        /* ── Responsive grid helpers ── */
        .tr-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .tr-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        .tr-grid-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .tr-grid-analytics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        /* ── Header ── */
        .tr-header-right { display: flex; align-items: center; gap: 16px; }
        .tr-reveal-badge { display: block; }
        .tr-user-info { display: block; text-align: right; }

        /* ── Tabs ── */
        .tr-tabs { display: flex; gap: 0; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .tr-tabs::-webkit-scrollbar { display: none; }
        .tr-tab-btn { white-space: nowrap; padding: 16px 20px !important; font-size: 13px !important; }

        /* ── Tables ── */
        .tr-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 12px; border: 2px solid #1f2937; }
        .tr-table-wrap table { min-width: 520px; }

        /* ── LoadCard ── */
        .tr-load-top { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; }

        /* ── Admin analytics grid ── */
        .tr-analytics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        /* ── Mobile overrides ── */
        @media (max-width: 640px) {
          .tr-grid-2 { grid-template-columns: 1fr; }
          .tr-grid-3 { grid-template-columns: 1fr; }
          .tr-grid-stats { grid-template-columns: 1fr 1fr; }
          .tr-grid-analytics { grid-template-columns: 1fr; }
          .tr-analytics-grid { grid-template-columns: 1fr; }
          .tr-reveal-badge { display: none; }
          .tr-user-info { display: none; }
          .tr-header-right { gap: 8px; }
          .tr-tab-btn { padding: 14px 12px !important; font-size: 11px !important; }
        }
      `}</style>

      {/* Subtle grid bg */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(#ffffff03 1px, transparent 1px), linear-gradient(90deg, #ffffff03 1px, transparent 1px)", backgroundSize: "40px 40px", zIndex: 0 }} />

      {/* Limit Popup */}
      {limitPopup && (
        <div style={{ position: "fixed", inset: 0, background: "#000000cc", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#111827", border: "2px solid #f59e0b", borderRadius: 16, padding: "36px 32px", maxWidth: 380, width: "100%", textAlign: "center", boxShadow: "0 0 60px #f59e0b33" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🚛</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, marginBottom: 12 }}>
              Truck Owner will Call You
            </div>
            <div style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.6, marginBottom: 24 }}>
              Thank you for using our Service.<br/>
              <span style={{ color: "#6b7280", fontSize: 13 }}>The truck owner has been notified and will contact you shortly.</span>
            </div>
            <button onClick={() => setLimitPopup(false)} style={{
              width: "100%", padding: "12px", background: "#f59e0b", color: "#111827",
              border: "none", borderRadius: 8, fontWeight: 900, fontSize: 15, cursor: "pointer",
              fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 2, textTransform: "uppercase",
            }}>OK, Got It</button>
            <div style={{ marginTop: 14, fontSize: 12, color: "#4b5563" }}>
              You've reached the limit of {REVEAL_LIMIT} contact reveals per 24 hours.<br/>
              <span style={{ color: "#6b7280" }}>Resets in {formatTimeLeft(timeLeft)}.</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, background: "#0d1117", borderBottom: "2px solid #1f2937", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🚛</span>
          <span style={{ fontSize: 24, fontWeight: 900, color: "#f9fafb", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 3 }}>
            TRUCK<span style={{ color: "#f59e0b" }}>ROUTE</span>
          </span>
        </div>
        <div className="tr-header-right">
          {/* Reveal counter badge */}
          {user.role === "trucker" && (
            <div className="tr-reveal-badge" style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8, padding: "5px 12px", fontSize: 12, color: revealCount >= REVEAL_LIMIT ? "#f87171" : "#9ca3af" }}>
                {revealCount >= REVEAL_LIMIT
                  ? `📞 Limit reached · resets in ${formatTimeLeft(timeLeft)}`
                  : `📞 ${revealCount}/${REVEAL_LIMIT} reveals used today`}
              </div>
          )}
          <div className="tr-user-info">
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f9fafb" }}>{user.name}</div>
            <div style={{ fontSize: 10, color: "#6b7280", letterSpacing: 2, textTransform: "uppercase" }}>{user.role}</div>
          </div>
          <button onClick={handleLogout}
            style={{ padding: "7px 14px", background: "#1f2937", color: "#9ca3af", border: "1px solid #374151", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: "'Barlow', sans-serif", fontWeight: 600 }}>
            Logout
          </button>
        </div>
      </header>

      {/* Trucker tabs */}
      {user.role === "trucker" && (
        <div className="tr-tabs" style={{ position: "relative", zIndex: 10, background: "#0d1117", borderBottom: "2px solid #1f2937", padding: "0 16px" }}>
          {[
            { key: "post", label: "📤 Post Empty Load" },
            { key: "find", label: "🔍 Find Empty Load" },
            { key: "enquiries", label: `📬 Enquiries${myEnquiries.length > 0 ? ` (${myEnquiries.length})` : ""}` },
          ].map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className="tr-tab-btn"
              style={{
                background: "transparent",
                color: activeTab === t.key ? "#f59e0b" : t.key === "enquiries" && myEnquiries.length > 0 ? "#22c55e" : "#6b7280",
                border: "none", borderBottom: activeTab === t.key ? "3px solid #f59e0b" : "3px solid transparent",
                fontWeight: 700, cursor: "pointer", fontFamily: "'Barlow', sans-serif", transition: "all .2s", letterSpacing: 0.5,
              }}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <main style={{ position: "relative", zIndex: 1, maxWidth: user.role === "admin" ? 1000 : 760, margin: "0 auto", padding: "24px 16px" }}>
        {user.role === "admin" && <AdminPanel loads={loads} setLoads={setLoads} currentUser={user} />}
        {user.role === "trucker" && activeTab === "post" && <PostLoad loads={loads} setLoads={setLoads} truckerName={user.name} currentUser={user} />}
        {user.role === "trucker" && activeTab === "find" && <FindLoad loads={loads} currentUser={user} onRevealAttempt={handleRevealAttempt} revealCount={revealCount} revealLimit={REVEAL_LIMIT} timeLeft={timeLeft} />}
        {user.role === "trucker" && activeTab === "enquiries" && <EnquiriesPanel enquiries={myEnquiries} truckerName={user.name} />}
      </main>
    </div>
  );
}
