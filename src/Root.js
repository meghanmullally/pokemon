import ResponsiveAppBar from "./components/Navigation";
import PokemonHeaderImg from './img/pokedex_logo.svg';

function RootLayout() {

    return (
        <>
            <ResponsiveAppBar />
            <img
                src={PokemonHeaderImg}
                alt="Pokemon Header"
                style=
                {{
                    height: '100px',
                    width: '200px'
                }}
            />
        </>
    );
}

export default RootLayout;