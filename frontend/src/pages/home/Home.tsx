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
} from "@mui/material";
import { fetchMovieData, MovieData } from "../../services/CreativeWorkService";
import "./style.css";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<null | MovieData[]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchMovieData().then((resp) => {
      setResults(resp.results);
      setTotalPages(resp.count);
    });
  }, []);

  // Handle search functionality and filtering
  const handleSearch = () => {
    if (search.trim() === "") {
      fetchMovieData().then((resp) => {
        setResults(resp.results);
      });
    } else {
      const filteredResults = results?.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filteredResults || null);
    }
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
              <Button
                className="search-button"
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
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
