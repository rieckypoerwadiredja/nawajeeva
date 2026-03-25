"use client";
import React from "react";

function error({ error }) {
  console.error(error);
  return <div>{error.message}</div>;
}

export default error;
