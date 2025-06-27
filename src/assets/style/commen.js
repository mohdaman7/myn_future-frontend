
export const pageStyles = {
    mainBox: {
        height: "72vh",
        width: '100%'
    },
    title: {
        margin: "0px",
        color: "#224053",
        fontSize: "22px",
        fontWeight: "900",
    },
    countList: {
        color: "#6a6a6a",
        margin: " 6px 0px"
    },

    searchbox: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },

    searchInput: {
        width: "100%",
        maxWidth: "500px",
        fontSize: "16px",
        color: "#343434",
        outline: "none",
        boxShadow: "none",
        lineHeight: '0',
        maxHeight: '35px',
    },

    newButtonBox: {
        display: 'flex',
        justifyContent: 'flex-end',
    },

    newButton: {
        fontWeight: 'bold',
        maxHeight: '35px',
        maxWidth: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 14px',
        backgroundColor: '#1677ff',
        color: '#fff',
        borderRadius: '4px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#105bb5'
        }
    },
    newButtonIcon: {
        margin: '0px 8px 0px 0px',
        fontSize: '16px',
        fontWeight: '600'
    },

    buttonIcon:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewIcon: {
        fontSize: "20px",
        padding: '4px 6px',
        color: "#199119",
        marginRight: '8px',
        fontWeight: '600',
        borderRadius: "5px",
        cursor: 'pointer'
    },
    editIcon: {
        fontSize: "20px",
        padding: '4px 6px',
        marginRight: '8px',
        color: "#1677ff",
        fontWeight: '600',
        borderRadius: "5px",
        cursor: 'pointer'
    },
    deleteIcon: {
        fontSize: "20px",
        padding: '4px 6px',
        color: "#ff4455",
        marginRight: '8px',
        fontWeight: '600',
        borderRadius: "5px",
        cursor: 'pointer'
    },
    softIcon: {
        fontSize: "20px",
        padding: '4px 6px',
        color: "#ff4455",
        marginRight: '8px',
        fontWeight: '600',
        borderRadius: "5px",
        cursor: 'pointer'
    },
    followUpIcon: {
        fontSize: "20px",
        padding: '4px 6px',
        color: "#1677ff",
        marginRight: '8px',
        fontWeight: '600',
        borderRadius: "5px",
        cursor: 'pointer'
    },
    statusStyle: {
        width: "100px",
        textAlign: "center",
        padding: '4px 8px',
        borderRadius: '12px',
        textTransform: 'capitalize',
    }

};



export const viewDrawerStyles = {
    mainBox: {
        padding: 3,
        position: 'relative',
        top: "60px"
    },
    head: {
        // paddingBottom:"15px",
        // borderBottom:"1px solid #dadada",
    },
    headContent: {
        display: "flex",
        alignItems: "center"
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
    },

    status: {
        padding: " 2px 20px",
        borderRadius: "9px",
        marginLeft: "10px",
    },

    drawerTitle: {
        color: 'rgb(36 68 89)',
        margin: '0px',
        fontSize: "20px",
        fontWeight: "600"
        //  textTransform:"capitalize"
    },
    dataContainer: {
        border: '1px solid #dadada',
        borderRadius: ' 9px',
        padding: "15px 10px"
    },

    label: {
        fontSize: "15px",
        color: "#343434"
    },
    value: {
        color: "#838383"
    }

};