import { Layout } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeScreen, Inventories, ManageStore, Orders, ReportScreen, Suplliers } from '../screens';
import { HeaderComponent, SiderComponent } from '../components';

const { Content, Footer } = Layout;

const MainRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <SiderComponent />
                    <Layout>
                        <HeaderComponent/>
                        <Content>
                            <Routes>
                                <Route path='/' element={<HomeScreen />} />
                                <Route path='/inventory' element={<Inventories/>} />
                                <Route path='/report' element={<ReportScreen/>} />
                                <Route path='/suppliers' element={<Suplliers/>} />
                                <Route path='/orders' element={<Orders/>} />
                                <Route path='/manage-store' element={<ManageStore/>} />
                            </Routes>
                        </Content>
                        <Footer />
                    </Layout>
                </Layout>
            </BrowserRouter>
        </>
    );
};

export default MainRouter;
