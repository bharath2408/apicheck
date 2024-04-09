"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiTable } from "react-icons/bi";
import { BsFiletypeJson, BsTable } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { MdOutlineFileUpload, MdOutlineInsertDriveFile } from "react-icons/md";
import { RiArrowUpSLine } from "react-icons/ri";
import { VscJson } from "react-icons/vsc";
import styles from "./page.module.css";
import Close from "/public/close.png";
import Pdf from "/public/pdf icon.png";

export default function Home() {
  const [filesPayload, setFilesPayload] = useState({});
  const [drivingFiles, setDrivingFiles] = useState(null);
  const [wTwoFiles, setWTwoFiles] = useState(null);
  const [SsnFiles, setSsnFiles] = useState(null);
  const [taxFiles, setTaxFiles] = useState(null);
  const [payslabsFiles, setPayslabsFiles] = useState(null);
  const [passportFiles, setPassportFiles] = useState(null);
  const [fileUploadStatus, setFileUploadStatus] = useState(false);
  const [jsonStatusDrive, setJsonStatusDrive] = useState(false);
  const [jsonStatusW2, setJsonStatusW2] = useState(false);
  const [jsonStatusSnn, setJsonStatusSsn] = useState(false);
  const [jsonStatusTax, setJsonStatusTax] = useState(false);
  const [jsonStatusPay, setJsonStatusPay] = useState(false);
  const [jsonStatusPass, setJsonStatusPass] = useState(false);
  const [driveStatus, setDriveStatus] = useState(false);
  const [wFileStaus, setWFileStatus] = useState(false);
  const [ssnstatus, setSsnStatus] = useState(false);
  const [taxStatus, setTaxStatus] = useState(false);
  const [payStatus, setPayStatus] = useState(false);
  const [passStatus, setPassStatus] = useState(false);
  const [extractData, setExtractData] = useState({});
  const router = useRouter();

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    console.log(files);
    setDrivingFiles(files);
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = btoa(
        new Uint8Array(e.target.result).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      setFilesPayload((prev) => {
        return {
          ...prev,
          driving_license: {
            filename: files.name,
            content_bytes: base64String,
          },
        };
      });
    };
    e.target.value = "";
    reader.readAsArrayBuffer(files);
  };

  const handleWFileChange = (e) => {
    const files = e.target.files[0];
    console.log(files);
    setWTwoFiles(files);
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = btoa(
        new Uint8Array(e.target.result).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      console.log(base64String);
      setFilesPayload((prev) => {
        return {
          ...prev,
          w2: {
            filename: files.name,
            content_bytes: base64String,
          },
        };
      });
    };
    e.target.value = "";
    reader.readAsArrayBuffer(files);
  };

  const handleSsnFileChange = (e) => {
    const files = e.target.files[0];
    console.log(files);
    setSsnFiles(files);
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = btoa(
        new Uint8Array(e.target.result).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      console.log(base64String);
      setFilesPayload((prev) => {
        return {
          ...prev,
          ssn: {
            filename: files.name,
            content_bytes: base64String,
          },
        };
      });
    };
    e.target.value = "";
    reader.readAsArrayBuffer(files);
  };

  const handleTaxFileChange = (e) => {
    const files = e.target.files[0];
    console.log(files);
    setTaxFiles(files);
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = btoa(
        new Uint8Array(e.target.result).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      console.log(base64String);
      setFilesPayload((prev) => {
        return {
          ...prev,
          taxreturn: {
            filename: files.name,
            content_bytes: base64String,
          },
        };
      });
    };
    e.target.value = "";
    reader.readAsArrayBuffer(files);
  };

  const handlePayFileChange = (e) => {
    const files = e.target.files[0];
    console.log(files);
    setPayslabsFiles(files);
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = btoa(
        new Uint8Array(e.target.result).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      console.log(base64String);
      setFilesPayload((prev) => {
        return {
          ...prev,
          paystubs: {
            filename: files.name,
            content_bytes: base64String,
          },
        };
      });
    };
    e.target.value = "";
    reader.readAsArrayBuffer(files);
  };

  const handlePassFileChange = (e) => {
    const files = e.target.files[0];
    console.log(files);
    setPassportFiles(files);
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = btoa(
        new Uint8Array(e.target.result).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      console.log(base64String);
      setFilesPayload((prev) => {
        return {
          ...prev,
          passport: {
            filename: files.name,
            content_bytes: base64String,
          },
        };
      });
    };
    e.target.value = "";
    reader.readAsArrayBuffer(files);
  };

  const fetchData = async () => {
    setFileUploadStatus(true);
    try {
      const response = await axios.get("/api/extract");
      setFileUploadStatus(false);
      setExtractData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileUpload = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    setFileUploadStatus(false);
    router.push("/extraction");
  };

  const formatBytes = (bytes) => {
    if (isNaN(bytes)) return;
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  useEffect(() => {
    console.log(filesPayload);
  }, [filesPayload]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.headercontainer}>
          <h1 className={styles.text}>Upload Files</h1>
          <button className={styles.process} onClick={() => fetchData()}>
            {fileUploadStatus ? (
              <div className={styles.loaderspan}></div>
            ) : (
              "Process"
            )}
          </button>
        </div>
        <div className={styles.uploadcontainer}>
          <>
            <div className={styles.card}>
              <div className={styles.carddetails}>
                <h4 className={styles.cardtitle}>Driving Licence</h4>
                {drivingFiles && (
                  <div className={styles.filechip}>
                    <Image src={Pdf} alt="pdf" width="20" height="20" />
                    <p className={styles.filename}>
                      {drivingFiles.name.split(".").slice(0, -1).join(".")}
                    </p>
                    <span
                      className={styles.close}
                      onClick={() => setDrivingFiles(null)}
                    >
                      <Image src={Close} alt="pdf" width="10" height="10" />
                    </span>
                  </div>
                )}
                <div className={styles.bytes}>
                  {formatBytes(drivingFiles?.size)}
                </div>
              </div>
              <div className={styles.cardUploadCon}>
                <label className={styles.fileupload}>
                  Choose Files
                  <input
                    className={styles.upload}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </label>
                <button
                  disabled={extractData?.data?.driving_license ? false : true}
                  className={!driveStatus ? styles.button : styles.rbutton}
                  onClick={() => {
                    setDriveStatus(!driveStatus);
                  }}
                >
                  <FaChevronDown />
                </button>
              </div>
            </div>
            {driveStatus && (
              <>
                <div className={styles.filescontainer}>
                  <div className={styles.switchcon}>
                    <button
                      onClick={() => setJsonStatusDrive(!jsonStatusDrive)}
                      className={styles.switch}
                    >
                      {jsonStatusDrive ? (
                        <span className={styles.span}>
                          <BiTable /> Table
                        </span>
                      ) : (
                        <span className={styles.span}>
                          <VscJson /> Json
                        </span>
                      )}
                    </button>
                  </div>
                  {jsonStatusDrive ? (
                    <div className={styles.prevcon}>
                      <pre
                        className={styles.prev}
                        lang="json"
                        numberLines="true"
                        outlining="true"
                      >
                        {JSON.stringify(
                          extractData?.data?.driving_license,
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  ) : (
                    <div className={styles.tablecontainer}>
                      <table>
                        <thead>
                          <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Other Income</th>
                            <th>SSN No</th>
                            <th>Standard Deduction</th>
                            <th>Total Income</th>
                            <th>Wages (or) Salary</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {extractData?.data?.driving_license?.first_name}
                            </td>
                            <td>
                              {extractData?.data?.driving_license?.last_name}
                            </td>
                            <td>
                              {extractData?.data?.driving_license
                                ?.other_income || "-"}
                            </td>
                            <td>
                              {extractData?.data?.driving_license?.ssn_number ||
                                "-"}
                            </td>
                            <td>
                              {extractData?.data?.driving_license
                                ?.standard_deduction || "-"}
                            </td>
                            <td>
                              {extractData?.data?.driving_license
                                ?.total_income || "-"}
                            </td>
                            <td>
                              {extractData?.data?.driving_license
                                ?.wages_or_salary || "-"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className={styles.card}>
              <div className={styles.carddetails}>
                <h4 className={styles.cardtitle}>W2</h4>
                {wTwoFiles && (
                  <div className={styles.filechip}>
                    <Image src={Pdf} alt="pdf" width="20" height="20" />
                    <p className={styles.filename}>
                      {wTwoFiles.name.split(".").slice(0, -1).join(".")}{" "}
                    </p>
                    <span
                      className={styles.close}
                      onClick={() => setWTwoFiles(null)}
                    >
                      <Image src={Close} alt="pdf" width="10" height="10" />
                    </span>
                  </div>
                )}
                <div className={styles.bytes}>
                  {formatBytes(wTwoFiles?.size)}
                </div>
              </div>
              <div className={styles.cardUploadCon}>
                <label className={styles.fileupload}>
                  Choose Files
                  <input
                    className={styles.upload}
                    type="file"
                    accept=".pdf"
                    onChange={handleWFileChange}
                  />
                </label>
                <button
                  disabled={extractData?.data?.w2 ? false : true}
                  className={!wFileStaus ? styles.button : styles.rbutton}
                  onClick={() => {
                    setWFileStatus(!wFileStaus);
                  }}
                >
                  <FaChevronDown />
                </button>
              </div>
            </div>
            {wFileStaus && (
              <div className={styles.filescontainer}>
                <div className={styles.switchcon}>
                  <button
                    onClick={() => setJsonStatusW2(!jsonStatusW2)}
                    className={styles.switch}
                  >
                    {jsonStatusW2 ? (
                      <span className={styles.span}>
                        <BiTable /> Table
                      </span>
                    ) : (
                      <span className={styles.span}>
                        <VscJson /> Json
                      </span>
                    )}
                  </button>
                </div>
                {jsonStatusW2 ? (
                  <div className={styles.prevcon}>
                    <pre
                      className={styles.prev}
                      lang="json"
                      numberLines="true"
                      outlining="true"
                    >
                      {JSON.stringify(extractData?.data?.w2, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className={styles.tablecontainer}>
                    <table>
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Other Income</th>
                          <th>SSN No</th>
                          <th>Standard Deduction</th>
                          <th>Total Income</th>
                          <th>Wages (or) Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{extractData?.data?.w2?.first_name}</td>
                          <td>{extractData?.data?.w2?.last_name}</td>
                          <td>{extractData?.data?.w2?.other_income || "-"}</td>
                          <td>{extractData?.data?.w2?.ssn_number || "-"}</td>
                          <td>
                            {extractData?.data?.w2?.standard_deduction || "-"}
                          </td>
                          <td>{extractData?.data?.w2?.total_income || "-"}</td>
                          <td>
                            {extractData?.data?.w2?.wages_or_salary || "-"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            <div className={styles.card}>
              <div className={styles.carddetails}>
                <h4 className={styles.cardtitle}>SSN</h4>
                {SsnFiles && (
                  <div className={styles.filechip}>
                    <Image src={Pdf} alt="pdf" width="20" height="20" />
                    <p className={styles.filename}>
                      {SsnFiles.name.split(".").slice(0, -1).join(".")}
                    </p>
                    <span
                      className={styles.close}
                      onClick={() => setSsnFiles(null)}
                    >
                      <Image src={Close} alt="pdf" width="10" height="10" />
                    </span>
                  </div>
                )}
                <div className={styles.bytes}>
                  {formatBytes(SsnFiles?.size)}
                </div>
              </div>
              <div className={styles.cardUploadCon}>
                <label className={styles.fileupload}>
                  Choose Files
                  <input
                    className={styles.upload}
                    type="file"
                    accept=".pdf"
                    onChange={handleSsnFileChange}
                  />
                </label>
                <button
                  disabled={extractData?.data?.ssn ? false : true}
                  className={!ssnstatus ? styles.button : styles.rbutton}
                  onClick={() => {
                    setSsnStatus(!ssnstatus);
                  }}
                >
                  <FaChevronDown />
                </button>
              </div>
            </div>
            {ssnstatus && (
              <div className={styles.filescontainer}>
                <div className={styles.switchcon}>
                  <button
                    onClick={() => setJsonStatusSsn(!jsonStatusSnn)}
                    className={styles.switch}
                  >
                    {jsonStatusSnn ? (
                      <span className={styles.span}>
                        <BiTable /> Table
                      </span>
                    ) : (
                      <span className={styles.span}>
                        <VscJson /> Json
                      </span>
                    )}
                  </button>
                </div>
                {jsonStatusSnn ? (
                  <div className={styles.prevcon}>
                    <pre
                      className={styles.prev}
                      lang="json"
                      numberLines="true"
                      outlining="true"
                    >
                      {JSON.stringify(extractData?.data?.ssn, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className={styles.tablecontainer}>
                    <table>
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Other Income</th>
                          <th>SSN No</th>
                          <th>Standard Deduction</th>
                          <th>Total Income</th>
                          <th>Wages (or) Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{extractData?.data?.ssn?.first_name}</td>
                          <td>{extractData?.data?.ssn?.last_name}</td>
                          <td>{extractData?.data?.ssn?.other_income || "-"}</td>
                          <td>{extractData?.data?.ssn?.ssn_number || "-"}</td>
                          <td>
                            {extractData?.data?.ssn?.standard_deduction || "-"}
                          </td>
                          <td>{extractData?.data?.ssn?.total_income || "-"}</td>
                          <td>
                            {extractData?.data?.ssn?.wages_or_salary || "-"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            <div className={styles.card}>
              <div className={styles.carddetails}>
                <h4 className={styles.cardtitle}>Tax</h4>
                {taxFiles && (
                  <div className={styles.filechip}>
                    <Image src={Pdf} alt="pdf" width="20" height="20" />
                    <p className={styles.filename}>
                      {taxFiles.name.split(".").slice(0, -1).join(".")}
                    </p>
                    <span
                      className={styles.close}
                      onClick={() => setTaxFiles(null)}
                    >
                      <Image src={Close} alt="pdf" width="10" height="10" />
                    </span>
                  </div>
                )}
                <div className={styles.bytes}>
                  {formatBytes(taxFiles?.size)}
                </div>
              </div>
              <div className={styles.cardUploadCon}>
                <label className={styles.fileupload}>
                  Choose Files
                  <input
                    className={styles.upload}
                    type="file"
                    accept=".pdf"
                    onChange={handleTaxFileChange}
                  />
                </label>
                <button
                  disabled={extractData?.data?.taxreturn ? false : true}
                  className={!taxStatus ? styles.button : styles.rbutton}
                  onClick={() => {
                    setTaxStatus(!taxStatus);
                  }}
                >
                  <FaChevronDown />
                </button>
              </div>
            </div>
            {taxStatus && (
              <div className={styles.filescontainer}>
                <div className={styles.switchcon}>
                  <button
                    onClick={() => setJsonStatusTax(!jsonStatusTax)}
                    className={styles.switch}
                  >
                    {jsonStatusTax ? (
                      <span className={styles.span}>
                        <BiTable /> Table
                      </span>
                    ) : (
                      <span className={styles.span}>
                        <VscJson /> Json
                      </span>
                    )}
                  </button>
                </div>
                {jsonStatusTax ? (
                  <div className={styles.prevcon}>
                    <pre
                      className={styles.prev}
                      lang="json"
                      numberLines="true"
                      outlining="true"
                    >
                      {JSON.stringify(extractData?.data?.taxreturn, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className={styles.tablecontainer}>
                    <table>
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Other Income</th>
                          <th>SSN No</th>
                          <th>Standard Deduction</th>
                          <th>Total Income</th>
                          <th>Wages (or) Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{extractData?.data?.taxreturn?.first_name}</td>
                          <td>{extractData?.data?.taxreturn?.last_name}</td>
                          <td>
                            {extractData?.data?.taxreturn?.other_income || "-"}
                          </td>
                          <td>
                            {extractData?.data?.taxreturn?.ssn_number || "-"}
                          </td>
                          <td>
                            {extractData?.data?.taxreturn?.standard_deduction ||
                              "-"}
                          </td>
                          <td>
                            {extractData?.data?.taxreturn?.total_income || "-"}
                          </td>
                          <td>
                            {extractData?.data?.taxreturn?.wages_or_salary ||
                              "-"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            <div className={styles.card}>
              <div className={styles.carddetails}>
                <h4 className={styles.cardtitle}>Pay Stubs</h4>
                {payslabsFiles && (
                  <div className={styles.filechip}>
                    <Image src={Pdf} alt="pdf" width="20" height="20" />
                    <p className={styles.filename}>
                      {payslabsFiles.name.split(".").slice(0, -1).join(".")}
                    </p>
                    <span
                      className={styles.close}
                      onClick={() => setPayslabsFiles(null)}
                    >
                      <Image src={Close} alt="pdf" width="10" height="10" />
                    </span>
                  </div>
                )}
                <div className={styles.bytes}>
                  {formatBytes(payslabsFiles?.size)}
                </div>
              </div>
              <div className={styles.cardUploadCon}>
                <label className={styles.fileupload}>
                  Choose Files
                  <input
                    className={styles.upload}
                    type="file"
                    accept=".pdf"
                    onChange={handlePayFileChange}
                  />
                </label>
                <button
                  disabled={extractData?.data?.payslabs ? false : true}
                  className={!payStatus ? styles.button : styles.rbutton}
                  onClick={() => {
                    setPayStatus(!payStatus);
                  }}
                >
                  <FaChevronDown />
                </button>
              </div>
            </div>
            {payStatus && (
              <div className={styles.filescontainer}>
                <div className={styles.switchcon}>
                  <button
                    onClick={() => setJsonStatusPay(!jsonStatusPay)}
                    className={styles.switch}
                  >
                    {jsonStatusPay ? (
                      <span className={styles.span}>
                        <BiTable /> Table
                      </span>
                    ) : (
                      <span className={styles.span}>
                        <VscJson /> Json
                      </span>
                    )}
                  </button>
                </div>
                {jsonStatusPay ? (
                  <div className={styles.prevcon}>
                    <pre
                      className={styles.prev}
                      lang="json"
                      numberLines="true"
                      outlining="true"
                    >
                      {JSON.stringify(extractData?.data?.paystubs, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className={styles.tablecontainer}>
                    <table>
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Other Income</th>
                          <th>SSN No</th>
                          <th>Standard Deduction</th>
                          <th>Total Income</th>
                          <th>Wages (or) Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{extractData?.data?.paystubs?.first_name}</td>
                          <td>{extractData?.data?.paystubs?.last_name}</td>
                          <td>
                            {extractData?.data?.paystubs?.other_income || "-"}
                          </td>
                          <td>
                            {extractData?.data?.paystubs?.ssn_number || "-"}
                          </td>
                          <td>
                            {extractData?.data?.paystubs?.standard_deduction ||
                              "-"}
                          </td>
                          <td>
                            {extractData?.data?.paystubs?.total_income || "-"}
                          </td>
                          <td>
                            {extractData?.data?.paystubs?.wages_or_salary ||
                              "-"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            <div className={styles.card}>
              <div className={styles.carddetails}>
                <h4 className={styles.cardtitle}>Passport</h4>
                {passportFiles && (
                  <div className={styles.filechip}>
                    <Image src={Pdf} alt="pdf" width="20" height="20" />
                    <p className={styles.filename}>
                      {passportFiles.name.split(".").slice(0, -1).join(".")}
                    </p>
                    <span
                      className={styles.close}
                      onClick={() => setPassportFiles(null)}
                    >
                      <Image src={Close} alt="pdf" width="10" height="10" />
                    </span>
                  </div>
                )}
                <div className={styles.bytes}>
                  {formatBytes(passportFiles?.size)}
                </div>
              </div>
              <div className={styles.cardUploadCon}>
                <label className={styles.fileupload}>
                  Choose Files
                  <input
                    className={styles.upload}
                    type="file"
                    accept=".pdf"
                    onChange={handlePassFileChange}
                  />
                </label>
                <button
                  disabled={extractData?.data?.passport ? false : true}
                  className={!passStatus ? styles.button : styles.rbutton}
                  onClick={() => {
                    setPassStatus(!passStatus);
                  }}
                >
                  <FaChevronDown />
                </button>
              </div>
            </div>
            {passStatus && (
              <div className={styles.filescontainer}>
                <div className={styles.switchcon}>
                  <button
                    onClick={() => setJsonStatusPass(!jsonStatusPass)}
                    className={styles.switch}
                  >
                    {jsonStatusPass ? (
                      <span className={styles.span}>
                        <BiTable /> Table
                      </span>
                    ) : (
                      <span className={styles.span}>
                        <VscJson /> Json
                      </span>
                    )}
                  </button>
                </div>
                {jsonStatusPass ? (
                  <div className={styles.prevcon}>
                    <pre
                      className={styles.prev}
                      lang="json"
                      numberLines="true"
                      outlining="true"
                    >
                      {JSON.stringify(extractData?.data?.passport, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className={styles.tablecontainer}>
                    <table>
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Other Income</th>
                          <th>SSN No</th>
                          <th>Standard Deduction</th>
                          <th>Total Income</th>
                          <th>Wages (or) Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {extractData?.data?.passport?.first_name || "-"}
                          </td>
                          <td>
                            {extractData?.data?.passport?.last_name || "-"}
                          </td>
                          <td>
                            {extractData?.data?.passport?.other_income || "-"}
                          </td>
                          <td>
                            {extractData?.data?.passport?.ssn_number || "-"}
                          </td>
                          <td>
                            {extractData?.data?.passport?.standard_deduction ||
                              "-"}
                          </td>
                          <td>
                            {extractData?.data?.passport?.total_income || "-"}
                          </td>
                          <td>
                            {extractData?.data?.passport?.wages_or_salary ||
                              "-"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </main>
  );
}
