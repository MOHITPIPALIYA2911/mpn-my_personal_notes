import React from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumb = (props) => {
  const { txt, subpath, url } = props;
  const navigate = useNavigate();

  return (
    <h4 className="pt-3 mb-5 select-none">
      <span className="fw-light text-muted">{txt} / </span>
      {subpath.map((path, index) => (
        <span
          key={index}
          onClick={() => {
            if (index !== subpath.length - 1) {
              navigate(url[index]);
            } else {
              // console.log("last");
            }
          }}
        >
          {index > 0 && " / "}
          {path}
        </span>
      ))}
    </h4>
  );
};

export default Breadcrumb;
