import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Radio, LinearProgress } from "@mui/material";

import newRequest from "../../utils/newRequest";
import toastService from "../../utils/toastService";

const BoardBanner = (props) => {
  const { slug } = props;
  const queryClient = useQueryClient();
  const [dataBannerGrid, setDataBannerGrid] = useState([]);

  // GET: Get all banner
  const { data, isLoading, error } = useQuery({
    queryKey: ["banners", slug],
    queryFn: () =>
      newRequest.get(`/banner/get?slug=${slug}`).then((res) => {
        const allImage = res.data.image.reverse();
        setDataBannerGrid(
          allImage.map((item, index) => ({
            stt: index + 1,
            image: item.url,
            nameFile: item.name,
            isShow: item.isShow,
            publicId: item.publicId,
            idObject: item._id,
          }))
        );
        return allImage;
      }),
  });

  // PUT: Update banner
  const updateBanner = useMutation({
    mutationFn: ({ imageOldId, imageNewId }) => {
      return newRequest.put(`/banner/update`, {
        imageOldId,
        imageNewId,
      });
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["banners"]);
    },
  });

  const handleUpdate = (imageOldId, imageNewId) => {
    updateBanner.mutate({ imageOldId, imageNewId });
  };

  // DELETE: Delete banner
  const deleteBanner = useMutation({
    mutationFn: (imgId) => {
      return newRequest.delete(`/banner/delete?slug=${slug}&imageId=${imgId}`);
    },
    onSuccess: (res) => {
      toastService.success(res.data.message);
      queryClient.invalidateQueries(["banners"]);
    },
  });

  const clickDelete = (imgId) => {
    deleteBanner.mutate(imgId);
  };

  const handleChange = (imgNewId) => {
    const imageToShow = data.find((item) => item.isShow);
    if (imageToShow) {
      const imgOldId = imageToShow._id;
      handleUpdate(imgOldId, imgNewId);
    } else {
      console.log("err");
    }
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
      width: 300,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          <img
            src={params.value}
            alt=""
            style={{
              width: "280px",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </a>
      ),
    },
    {
      field: "nameFile",
      headerName: "Name file",
      width: 180,
    },
    {
      field: "publicId",
      headerName: "Public Id",
      width: 300,
    },
    {
      field: "idObject",
      headerName: "Id Object",
      width: 240,
    },
    {
      field: "isShow",
      headerName: "Is Show",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Radio
          checked={params.row.isShow}
          onChange={() => {
            handleChange(params.row.idObject);
          }}
        />
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
          onClick={() => clickDelete(params.row.idObject)}
          disabled={params.row.isShow ? true : false}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box>
      {isLoading ? (
        <LinearProgress />
      ) : error ? (
        <div>Error</div>
      ) : (
        <DataGrid
          density="comfortable"
          getRowId={(row) => row.stt}
          rows={dataBannerGrid}
          columns={columns}
          rowHeight={100}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </Box>
  );
};

export default BoardBanner;
