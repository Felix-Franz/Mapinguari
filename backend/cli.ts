#!/usr/bin/env node

import Server from "./src/Server";
import {Logger} from "./index";

Logger.configure();
Server.start();
