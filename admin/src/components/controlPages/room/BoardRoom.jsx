import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Box, LinearProgress } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import newRequest from "../../../utils/newRequest";
import toastService from "../../../utils/toastService";

const BoardRoom = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [dataRoomGrid, setDataRoomGrid] = useState([]);

  // GET: Get all rooms
  const { isLoading, error } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => newRequest.get(`room`),
    onSuccess: (res) => {
      setDataRoomGrid(
        res.data.map((item, index) => ({
          stt: index + 1,
          image: item.images[0].url,
          name: item.name,
          notes: item.notes,
          idObject: item._id,
        }))
      );
    },
  });

  // DELETE: Delete room
  const deleteBanner = useMutation({
    mutationFn: (roomId) => {
      return newRequest.delete(`/room/delete/${roomId}`);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["rooms"]);
    },
  });

  const handleDelete = (roomId) => {
    deleteBanner.mutate(roomId);
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
      width: 150,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 300,
      renderCell: (params) => (
        <TextareaAutosize
          readOnly
          defaultValue={params.value}
          maxRows={4}
          style={{ padding: 5, width: 280, height: 100 }}
        />
      ),
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
          rows={dataRoomGrid}
          columns={columns}
          rowHeight={100}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </Box>
  );
};

export default BoardRoom;
