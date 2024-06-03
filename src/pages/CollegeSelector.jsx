import { useState, useEffect } from "react";
import { Autocomplete, TextField, Card, CardContent } from "@mui/material";
import axios from "axios";

const CollegeSelector = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json"
        );
        setColleges(response.data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleCollegeChange = async (event, newValue) => {
    setSelectedCollege(newValue);
    if (newValue) {
      try {
        const domain = newValue.domains[0];
        const logoUrl = `https://logo.clearbit.com/${domain}`;
        const response = await axios.get(logoUrl);
        if (response.status === 200) {
          setLogoUrl(logoUrl);
        } else {
          setLogoUrl(null);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
        setLogoUrl(null);
      }
    } else {
      setLogoUrl(null);
    }
  };

  return (
    <div className=" p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r text-transparent from-[#F07946] to-[#FEAB88] bg-clip-text mt-10">
        College Selector
      </h1>
      <div className="w-full max-w-lg">
        <Autocomplete
          options={colleges}
          getOptionLabel={(option) => option.name}
          loading={loading}
          onChange={handleCollegeChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                <span className="bg-gradient-to-r text-transparent from-[#F07946] to-[#FEAB88] bg-clip-text">
                  Select a college
                </span>
              }
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                style: {
                  color: "#6B7280",
                },
              }}
              fullWidth
            />
          )}
        />
      </div>
      {selectedCollege && (
        <div className="mt-6 w-full max-w-lg">
          <Card>
            <CardContent>
              <div className="flex items-center mb-4">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={`${selectedCollege.name} logo`}
                    className="mr-4 max-w-[100px]"
                  />
                ) : (
                  <p className="mr-4 text-red-500">Logo not available</p>
                )}
                <div>
                  <h2 className="text-xl font-semibold">
                    College Name: {selectedCollege.name}
                  </h2>
                  <a
                    href={`http://${selectedCollege.domains[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website: {selectedCollege.domains[0]}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CollegeSelector;
