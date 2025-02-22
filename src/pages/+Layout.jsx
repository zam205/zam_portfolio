// import Providers from "../data/Providers";
// import { ContextProvider } from "#/context/contextProvider";
// import { PageContextProvider } from '../../renderer/usePageContext';
// import { childrenPropType } from '../../renderer/PropTypeValues';
// import PropTypes from 'prop-types';
import '../../renderer/Layout.css';
import NavBar from '../components/NavBar/NavBar';

export { Layout }

// Layout.propTypes = {
//     pageContext: PropTypes.any,
//     children: childrenPropType
// }

function Layout({ children }) {

    return (
        <>
            <div className='relative'>
                <NavBar />

                { children }
            </div>
        </>
    )
}