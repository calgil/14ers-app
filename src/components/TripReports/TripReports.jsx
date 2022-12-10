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

  const getNewReports = () => {
    getTripReports()
      .then(setReports)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getNewReports();
  }, []);

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
