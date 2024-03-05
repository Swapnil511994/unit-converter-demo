//Components
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

//Assets
import unitConverterLogo from "./Assets/Images/unitconverter.png";

export default function Menu() {
  const redirectToLinkedin = () => {
    window.open("https://www.linkedin.com/in/swapnilvishwakarma/", "_blank");
  };
  return (
    <Toolbar
      start={
        <>
          <img
            src={unitConverterLogo}
            alt="Logo"
            style={{ height: "60px", width: "60px" }}
          />
          <h1 className="p-0 m-0">Unit Converter</h1>
        </>
      }
      end={
        <>
          <Button
            icon="pi pi-linkedin"
            label=""
            type="button"
            onClick={redirectToLinkedin}
          ></Button>
        </>
      }
      className="shadow-2 w-full border-noround"
      //   style={{ backgroundColor: "#4169e1" }}
    />
  );
}
