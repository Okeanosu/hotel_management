import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Box, LinearProgress } from "@mui/material";

import newRequest from "../../../utils/newRequest";
import toastService from "../../../utils/toastService";

const BoardPost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [dataPostGrid, setDataPostGrid] = useState([]);

  // GET: Get all Posts
  const { isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => newRequest.get(`post`),
    onSuccess: (res) => {
      setDataPostGrid(
        res.data.map((item, index) => ({
          stt: index + 1,
          title: item.title,
          image: item.images[0].url,
          idObject: item._id,
        }))
      );
    },
  });

  // DELETE: Delete Post
  const deleteBanner = useMutation({
    mutationFn: (postId) => {
      return newRequest.delete(`/post/delete/${postId}`);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleDelete = (postId) => {
    deleteBanner.mutate(postId);
  };

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 50,
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          <img
            src={params.value}
            alt=""
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
            }}
          />
        </a>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 500,
    },
    {
      field: "idObject",
      headerName: "Id Object",
      width: 240,
    },
    {
      field: "Update",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(`update/${params.row.idObject}`)}
        >
          Update
        </Button>
      ),
    },
    {
      field: "Delete",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.idObject)}
          disabled={params.row.isShow ? true : false}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box style={{ height: "100%", width: "100%" }}>
      {isLoading ? (
        <LinearProgress />
      ) : error ? (
        <>Error</>
      ) : (
        <DataGrid
          density="comfortable"
          getRowId={(row) => row.stt}
          rows={dataPostGrid}
          columns={columns}
          rowHeight={100}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </Box>
  );
};

export default BoardPost;
