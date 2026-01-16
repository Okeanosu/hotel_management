import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Box, LinearProgress } from "@mui/material";

import newRequest from "../../../utils/newRequest";
import toastService from "../../../utils/toastService";

const BoardTour = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [tourData, setTourData] = useState([]);

  // GET: Get all tour
  const {
    isLoading,
    error,
    // data: allTour,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: () => newRequest.get(`tour`),
    onSuccess: (res) => {
      setTourData(
        res.data.map((item, index) => ({
          stt: index + 1,
          image: item.images[0].url,
          name: item.name,
          tourCode: item.tourCode,
          idObject: item._id,
        }))
      );
    },
  });

  // DELETE: Delete tour
  const deleteBanner = useMutation({
    mutationFn: (tourId) => {
      return newRequest.delete(`/tour/delete/${tourId}`);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["tours"]);
    },
  });

  const handleDelete = (tourId) => {
    deleteBanner.mutate(tourId);
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
      field: "name",
      headerName: "Name",
      width: 400,
    },
    {
      field: "tourCode",
      headerName: "Tour Code",
      width: 150,
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
          rows={tourData}
          columns={columns}
          rowHeight={100}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </Box>
  );
};

export default BoardTour;
