import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Pagination,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import {
  fetchMovieData,
  fetchUniqueSources,
  MovieData,
} from "../../services/CreativeWorkService";
import "./style.css";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<null | MovieData[]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [site, setSite] = useState("All Sites");
  const [totalCount, setTotalCount] = useState(0);
  const [sources, setSources] = useState<string[]>([]);

  const fetchMovies = () => {
    const params: any = { page: currentPage };
    if (search.trim() !== "") {
      params.s = search.trim();
    }
    if (site !== "All Sites") {
      params.source = site;
    }
    fetchMovieData(params).then((resp) => {
      setResults(resp.results);
      setTotalPages(Math.ceil(resp.count / 10));
      setTotalCount(resp.count)
    });
  };

  useEffect(() => {
    fetchMovies();
    fetchUniqueSources().then((data) => {
      setSources(data);
    });
  }, [currentPage, site]);

  // Handle search functionality and filtering
  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page on search
    fetchMovies();
  };

  // Handle search on Enter key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Handle pagination change
  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleDropdownChange = (event: any) => {
    const value = event.target.value;
    setSite(value);
    setCurrentPage(1); // Reset page to 1 when changing the site filter
  };

  return (
    <Container maxWidth="md">
      <Box className="center-box">
        <Card className="center-card">
          <CardHeader title="Film & TV Extractor" className="card-header" />
          <CardContent className="card-content">
            <Box className="inline-form">
              <TextField
                label="Search"
                fullWidth
                margin="normal"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <FormControl fullWidth margin="normal" className="form-field">
                <Select
                  labelId="site-select-label"
                  value={site}
                  onChange={handleDropdownChange}
                >
                  <MenuItem value="All Sites">All Sites</MenuItem>
                  {sources.map((source) => (
                    <MenuItem key={source} value={source}>
                      {source}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                className="search-button"
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
            <span className="result-count">{ totalCount } Results(s)</span>
            <List>
              {results &&
                results.map((result) => (
                  <ListItem
                    key={result.id}
                    button
                    component="a"
                    href={result.page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={result.thumbnail_url}
                      alt={result.title}
                      style={{ width: 64, height: 64, marginRight: 16 }}
                    />
                    <ListItemText
                      primary={`Title: ${result.title}`}
                      secondary={`Page: ${result.page_url}`}
                    />
                  </ListItem>
                ))}
            </List>
            <Box className="pagination-box">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePaginationChange}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
