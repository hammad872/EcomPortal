import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const SkeletonLoading = () => {
  return (
    <>
      <li className="py-1" style={{ listStyleType: "none" }}>
        <Stack spacing={2}>
          <div className="row ">
            <div className="col-lg-2 pl-1">
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            </div>
            <div className="col-lg-10">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "0.5rem" }} />
            </div>
          </div>
        </Stack>
      </li>
    </>
  );
};

export default SkeletonLoading;
