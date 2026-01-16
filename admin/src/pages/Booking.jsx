import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, LinearProgress } from "@mui/material";

import newRequest from "../utils/newRequest";
import toastService from "../utils/toastService";

const Booking = () => {
  const queryClient = useQueryClient();
  const [dataFoodGrid, setDataFoodGrid] = useState([]);
  // GET: Get all bookings
  const { isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await newRequest.get(`/booking`);
      const data = res.data.reverse().map((item, index) => ({
        stt: index + 1,
        nameFood: item.name,
        idObject: item._id,
        image: item.image.url,
        nameFile: item.image.name,
        publicId: item.image.publicId,
      }));
      setDataFoodGrid(data);
      return res.data;
    },
  });

  // DELETE: Delete Food
  const deleteFood = useMutation({
    mutationFn: (foodId) => {
      return newRequest.delete(`/food/delete/${foodId}`);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["bookings"]);
    },
  });

  const clickDelete = (foodId) => {
    deleteFood.mutate(foodId);
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
      field: "nameFood",
      headerName: "Name food",
      width: 260,
    },
    {
      field: "nameFile",
      headerName: "Name file",
      width: 180,
    },
    {
      field: "publicId",
      headerName: "Public Id",
      width: 250,
    },
    {
      field: "idObject",
      headerName: "Id Object",
      width: 240,
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
          onClick={() => clickDelete(params.row.idObject)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {isLoading ? (
        <LinearProgress />
      ) : error ? (
        <div>Error</div>
      ) : (
        <DataGrid
          density="comfortable"
          getRowId={(row) => row.stt}
          rows={dataFoodGrid}
          columns={columns}
          rowHeight={100}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </div>
  );
};

export default Booking;
