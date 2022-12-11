import React, { useEffect, useState } from "react";
import s from "./TripReports.module.css";
import { getTripReports } from "../../services";
import TripReport from "../TripReport/TripReport";
import TripReportUpload from "../TripReportUpload/TripReportUpload";
import PeakSelector from "../PeakSelector/PeakSelector";
import SearchBar from "../SearchBar/SearchBar";

const TripReports = () => {
  const [reports, setReports] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [selectedPeak, setSelectedPeak] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [limit, setLimit] = useState(5);

  const buildQueryStr = () => `?limit=${limit}&sort=-dateClimbed`;

  const getNewReports = () => {
    getTripReports(buildQueryStr())
      .then(setReports)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getNewReports();
  }, []);

  useEffect(() => {
    if (showUploadModal) {
      return;
    }
    getNewReports();
  }, [showUploadModal]);

  const updateSearchResults = (data) => {
    setSearchResults(data);
  };

  useEffect(() => {
    updateSearchResults(reports);
  }, [reports]);

  const resetSearch = () => {
    setSearchResults(reports);
  };

  const openModal = () => {
    setShowUploadModal(true);
  };

  const closeModal = () => {
    setShowUploadModal(!showUploadModal);
  };

  const changeLimit = ({ target: { value } }) => {
    setLimit(+value);
    getNewReports();
  };

  const updatePeak = (peak) => {
    if (!peak) {
      return;
    }
    setSelectedPeak(peak);
  };

  return (
    <div className={s.tripReports}>
      <div className={s.searchContainer}>
        <SearchBar
          searchResults={searchResults}
          setSearchResults={updateSearchResults}
          resetSearch={resetSearch}
          type="peakName"
        />
        <button onClick={openModal} className={s.addReportBtn}>
          <span>Add Report</span>
        </button>
        <label>Showing {limit} per page</label>
        <select name="limit" id="limit" onChange={changeLimit} value={limit}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value="all">All</option>
        </select>
      </div>
      {showUploadModal && (
        <TripReportUpload peak={selectedPeak} close={closeModal}>
          <PeakSelector updatePeak={updatePeak} />
        </TripReportUpload>
      )}
      {!!searchResults.length && (
        <div className={s.reportTable}>
          {searchResults.map((report) => (
            <TripReport
              key={report._id}
              report={report}
              getNewReports={getNewReports}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TripReports;
