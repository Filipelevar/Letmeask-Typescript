import { Toaster } from "react-hot-toast"


export function Toast() {

    return (
        <Toaster
            toastOptions={{
                success: {
                    style: {
                        backgroundColor: "#e5e5e5",
                        color: 'black',
                        borderLeft: "10px solid green"
                    },
                    iconTheme: {
                        primary: "green",
                        secondary: 'white',
                    },
                },
                error: {
                    style: {
                        background: "#e5e5e5",
                        color: "black",
                        borderLeft: "10px solid red"
                    },
                },
                duration: 3000,
                position: "top-center",
                style: {
                    padding: '16px',
                    marginTop: '64px',
                    marginRight: '24px',
                    transition: "opacity 200ms ease-in-out",
                }
            }}
        />
    )
}
