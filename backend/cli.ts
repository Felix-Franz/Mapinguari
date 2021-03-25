#!/usr/bin/env node

import Server from "./src/libraries/Server";
import {Logger} from "./index";

Logger.configure();
Server.start();
