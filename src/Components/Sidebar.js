import React from "react";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from "@material-ui/core";
import {SearchOutlined} from '@material-ui/icons';

import './Sidebar.css'
import SidebarChat from "./SidebarChat";
import { useStateValue } from "../StateProvider";



const Sidebar=({messages}) => {
    const [{user}, dispatch] = useStateValue()
    return(
        <>
            <div className="sidebar">
                <div className="sidebar__header">
                    <Avatar src={user?.photoURL}/>
                    <div className="sidebar__headerRight">
                        <IconButton>
                            <DonutLargeIcon />
                        </IconButton>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>    
                </div>
                <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined />
                        <input placeholder="enter text to search" type="text" />
                    </div>
                </div>
                <div className="sidebar__chat">
                    <SidebarChat messages={messages} />
                </div>
            </div>
        
        </>
    )
}

export default Sidebar;