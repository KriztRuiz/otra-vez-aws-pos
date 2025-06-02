// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// 1. Importa Amplify y la configuración (aws-exports.js)
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

// 2. (Opcional) Si vas a usar componentes de UI de Amplify
import { AmplifyProvider } from "@aws-amplify/ui-react";

// 3. Configura Amplify con los datos de aws-exports
Amplify.configure(awsconfig);

ReactDOM.render(
  <AmplifyProvider>
    <App />
  </AmplifyProvider>,
  document.getElementById("root")
);
