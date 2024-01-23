import Header from "./Header/Header";

function ErrorPage() {

    return (
        <>
            <Header />
            <main>
                <h1>An error occured!</h1>
                <p>Could not find this page!</p>
            </main>
        </>
    );
}

export default ErrorPage;