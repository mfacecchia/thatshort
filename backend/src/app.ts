import startup from "./common/utils/appConfig";

const app = startup();

app.listen(8000, () => {
    console.log("Listening.");
});
