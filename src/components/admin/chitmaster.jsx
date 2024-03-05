import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../utils/Breadcrumbs";
import { Modal, Select, Radio } from "antd";
import {
  ChitMasterSchema,
  ChitMasterinitValue,
} from "../../validations/chitMaster";
import { useFormik } from "formik";
import { AddChit, getChits, getAllCompany } from "../../services/service";
import DataTable from "react-data-table-component";
import DateFormat from "../date";
import EmtyPage from "../../../public/emptypage.png";
import CurrencyComponent from "../utils/currency";
import Loader from "../utils/loader";

function ChitMaster() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [chits, setChits] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  // const [searchTerm, setSearchTerm] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [companyId, setCompanyId] = React.useState("");
  const [ companyAuctionDate, setCompanyAuctionDate ] = React.useState('')
  const showModal = () => {
    setIsModalOpen(true);
  };

  let navigate = useNavigate();

  const forms = useFormik({
    initialValues: ChitMasterinitValue,
    validationSchema: ChitMasterSchema,
    onSubmit: (values) => {
      submitForms(values);
    },
  });
  const handleCancel = () => {
    setIsModalOpen(false);
    forms.values.chitAmount = ""
    forms.values.chitName = ""
    forms.values.companyId = ""
    forms.values.companyName = ""
    forms.values.describeDate = ""
    forms.values.group = ""
    forms.values.months = ""
    forms.values.noOfPeople = ""
    setCompanyAuctionDate('')
    forms.resetForm();
  };

  const submitForms = async (value) => {
    setLoader(true);
    if(companyAuctionDate =='Every Month 5'){
      forms.values.describeDate = 5
    }else{
      forms.values.describeDate = companyAuctionDate
    }
    try {
      await AddChit(value);
      getChit();
      handleCancel();
      setErr(null);
    } catch (error) {
      setErr(error.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  const getChit = async () => {
    setLoader(true);
    try {
      let values = await getChits();
      setChits(values.data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const getCompanies = async () => {
    setLoader(true);
    try {
      let values = await getAllCompany();
      setCompanies(values.data);
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const reloaded = sessionStorage.getItem("reloaded");
    if (!reloaded) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    // {
    //   name: <h1 className="text-lg  text-gray-500">Company</h1>,
    //   selector: (row) => row.companyName,
    // },
    {
      name: <h1 className="text-lg text-gray-500">Chit Name</h1>,
      selector: (row) => row.chitName,
      sortable: true,
    },
    {
      name: <h1 className="text-lg text-gray-500">Chit Amount</h1>,
      selector: (row) => <CurrencyComponent amount={row.chitAmount} />,
    },
    {
      name: <h1 className="text-lg text-gray-500">Commission</h1>,
      selector: (row) => <CurrencyComponent amount={row.serviceCharges} />,
    },
    {
      name: <h1 className="text-lg text-gray-500">Group</h1>,
      selector: (row) => row.group,
    },
    {
      name: <h1 className="text-lg text-gray-500">Auction Date</h1>,
      cell: (row) => <DateFormat date={row.createdAt} />,
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "48px", // override the row height
        minWidth: "800px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "#F3F4F6",
        color: "#6c737f",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        fontSize: "16px",
        color: "#364353",
      },
    },
  };

  useEffect(() => {
    getChit();
    getCompanies();
    // const result =
    //   chits &&
    //   chits.filter((value) => {
    //     return value.group.match(group);
    //   });
    // setFilteredData(result);
  }, []);

  const location = useLocation();
  const pathname = location.pathname;
  const paths = pathname.split("/").filter((path) => path);

  return (
    <>
      {loader ? <Loader data={loader} /> : null}
      <div>
        <div className="flex xs:flex-row flex-col xs:justify-between items-center gap-3 xs:gap-0 max-w-[95%] pt-10 font-bold">
          <div></div>
          <div className="text-xl">Chit Master</div>
          <div className="">
            <button
              onClick={showModal}
              className=" bg-[#176B87] flex justify-center items-center text-white w-28 gap-1 rounded-md h-8 xs:text-base text-sm"
            >
              New Chit
            </button>
          </div>
        </div>

        {chits.length > 0 ? (
          <div className="w-[95%] m-auto mt-5 h-[75vh] overflow-auto">
            <DataTable
              columns={columns}
              data={chits}
              fixedHeader
              pagination
              customStyles={customStyles}
            />
          </div>
        ) : (
          <div className="w-[95%] m-auto h-[88vh]">
            <img src={EmtyPage} alt="" className="w-[80%] h-full m-auto" />
          </div>
        )}
      </div>

      {/* Models */}
      <div>
        <Modal
          title="Add Chits"
          height={"260px"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center">
            <div className="flex flex-col mb-4">
              <label className="pl-4">Company :</label>
              <Select
                name="companyName"
                id="companyId"
                onBlur={forms.handleBlur}
                onChange={(value) => {
                  forms.setFieldValue("companyId", value);
                  const selectedCompany = companies.find(
                    (company) => company._id === value
                  );
                  if (selectedCompany) {
                    if(selectedCompany.auctionDates == 5){
                      setCompanyAuctionDate(`Every Month ${selectedCompany.auctionDates}`);
                    }else{
                      setCompanyAuctionDate(`Every Month ${selectedCompany.auctionDates}`);
                    }
                    forms.values.describeDate = selectedCompany.auctionDates

                  }
                }}
                className="h-10 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                placeholder="Select Company"
              >
                <Select.Option value="">Select Company</Select.Option>
                {companies &&
                  companies.map((company) => (
                    <Select.Option value={company._id} key={company._id}>
                      {company.companyName}
                    </Select.Option>
                  ))}
              </Select>

              {forms.errors.companyId && forms.touched.companyId ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.companyId}
                </div>
              ) : null}
              {err ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {err}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4"> Chit Name :</label>
              <input
                type="text"
                placeholder="Enter Chit Name"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="chitName"
                id="chitName"
                onBlur={forms.handleBlur}
                value={forms.values.chitName}
                onChange={forms.handleChange}
              />
              {forms.errors.chitName && forms.touched.chitName ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.chitName}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4"> Chit Amount :</label>
              <input
                type="number"
                placeholder="Enter Chit Amount"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="chitAmount"
                id="chitAmount"
                onBlur={forms.handleBlur}
                value={forms.values.chitAmount}
                onChange={forms.handleChange}
              />
              {forms.errors.chitAmount && forms.touched.chitAmount ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.chitAmount}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4">Group :</label>
              <input
                type="text"
                placeholder="Enter Group"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="group"
                id="group"
                onBlur={forms.handleBlur}
                value={forms.values.group}
                onChange={forms.handleChange}
              />
              {forms.errors.group && forms.touched.group ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.group}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4">20 months Auctions:</label>
              <Radio.Group
                onChange={(e) => forms.setFieldValue("months", e.target.value)}
                value={forms.values.months}
                className="pl-5"
              >
                <Radio value={20}>Yes</Radio>
                <Radio value={19}>No</Radio>
              </Radio.Group>
              {forms.errors.months && forms.touched.months ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.months}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4">No Of Peoples :</label>
              <input
                type="number"
                placeholder="Enter No Of Peoples"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="noOfPeople"
                id="noOfPeople"
                onBlur={forms.handleBlur}
                value={forms.values.noOfPeople}
                onChange={forms.handleChange}
              />
              {forms.errors.noOfPeople && forms.touched.noOfPeople ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.noOfPeople}
                </div>
              ) : null}
            </div>
            
            <div className="flex flex-col mb-4">
              <label className="pl-4">Auction Date :</label>
              <input
                type="text"
                placeholder="Enter No Of Peoples"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                readOnly
                value={companyAuctionDate}
              />
              
            </div>

            <div className="flex justify-center">
              <button
                className="bg-[#176B87] w-36 h-[35px] text-white font-bold rounded-md"
                onClick={forms.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ChitMaster;
