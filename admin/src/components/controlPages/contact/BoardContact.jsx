import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import newRequest from "../../../utils/newRequest";
import toastService from "../../../utils/toastService";
import FormDetails from "./FormDetails";

const BoardContact = () => {
  const queryClient = useQueryClient();
  const [dataContactGrid, setDataContactGrid] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    content: "",
  });

  // GET: Get all contact
  const {
    data: allContact,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await newRequest.get(`/contact`);
      const data = res.data.reverse().map((item, index) => ({
        stt: index + 1,
        idObject: item._id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        address: item.address,
        title: item.title,
        content: item.content,
      }));
      setDataContactGrid(data);
      return res.data;
    },
  });

  // GET: Get a contact
  const clickDetails = (stt) => {
    setIsOpen(true);
    setFormDetails(allContact[stt - 1]);
  };

  // DELETE: Delete Contact
  // const deleteContact = useMutation({
  //   mutationFn: (contactId) => {
  //     return newRequest.delete(`/contact/delete/${contactId}`);
  //   },
  //   onSuccess: (res) => {
  //     toastService.success(res.data.message);
  //     queryClient.invalidateQueries(["contacts"]);
  //   },
  // });

  // const clickDelete = (contactId) => {
  //   deleteContact.mutate(contactId);
  // };

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 50,
    },
    {
      field: "title",
      headerName: "Title",
      width: 300,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
    },

    // {
    //   field: "idObject",
    //   headerName: "Id Object",
    //   width: 240,
    // },
    // {
    //   field: "Delete",
    //   headerName: "",
    //   width: 100,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params) => (
    //     <Button
    //       variant="contained"
    //       color="error"
    //       onClick={() => clickDelete(params.row.idObject)}
    //     >
    //       Delete
    //     </Button>
    //   ),
    // },
    {
      field: "Details",
      headerName: "",
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          onClick={() => clickDetails(params.row.stt)}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "800px!important",
          },
        }}
      >
        <FormDetails {...formDetails} />
      </Dialog>
      {isLoading ? (
        <LinearProgress />
      ) : error ? (
        <div>Error</div>
      ) : (
        <DataGrid
          density="comfortable"
          getRowId={(row) => row.stt}
          rows={dataContactGrid}
          columns={columns}
          rowHeight={100}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </div>
  );
};

export default BoardContact;
