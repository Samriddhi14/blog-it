import { useEffect, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from "../../service/api";

//components
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || '', page });
            if (response.isSuccess) {
                setPosts(response.data.data);
                setTotalPages(response.data.pages);
            }
        };
        fetchData();
    }, [category, page]);

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {posts?.length ? (
                    posts.map((post) => (
                        <Grid item lg={3} sm={2} xs={12} key={post._id}>
                            <Link
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                to={`details/${post._id}`}
                            >
                                <Post post={post} />
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <Box
                        style={{
                            color: '#878787',
                            margin: '30px 80px',
                            fontSize: 18,
                        }}
                    >
                        No data is available for the selected category
                    </Box>
                )}
            </Grid>

            <Box display="flex" justifyContent="center" mt={4}>
                <Button
                    variant="outlined"
                    disabled={page === 1}
                    onClick={handlePrevious}
                    style={{ marginRight: 10 }}
                >
                    Previous
                </Button>
                <Button
                    variant="outlined"
                    disabled={page === totalPages}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default Posts;
