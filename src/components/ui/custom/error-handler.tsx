export const errorHandler = (toast: any, err: any) => {

    const logError = () => {
        // Send Error Details To The Backend
        console.log("Error: " + String(err));
    }

    const showToast = () => {
        toast({
            title: new Date().toLocaleString(),
            description: "Something went wrong. There was a problem with your request.",
            variant: "destructive",
        })
    }

    logError();
    showToast();
}