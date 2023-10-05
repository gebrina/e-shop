import { Button } from "primereact/button";
import {
  ColumnFilterApplyTemplateOptions,
  ColumnFilterClearTemplateOptions,
  ColumnFilterElementTemplateOptions,
} from "primereact/column";
import { InputText } from "primereact/inputtext";
import { ChangeEvent } from "react";

export const filterApplyButton = (
  options: ColumnFilterApplyTemplateOptions
) => (
  <Button onClick={options.filterApplyCallback} className="btn btn-success">
    Apply
  </Button>
);

export const filterClearButton = (
  options: ColumnFilterClearTemplateOptions
) => (
  <Button className="btn btn-secondary" onClick={options.filterClearCallback}>
    Clear
  </Button>
);

export const filterElment = (options: ColumnFilterElementTemplateOptions) => (
  <InputText
    value={options.value}
    className="form-control"
    onChange={(e: ChangeEvent<HTMLInputElement>) =>
      options.filterCallback(e.target.value)
    }
  />
);
