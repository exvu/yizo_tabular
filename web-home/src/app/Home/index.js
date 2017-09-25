import React from 'react'
import './index.less'
import { TabBar, Icon, NavBar } from 'antd-mobile';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
        };
    }
    renderContent(pageText) {
        return (
            <div>
                {pageText}
            </div>
        );
    }
    render() {
        return (
            <div className="home">
                <NavBar
                    mode="dark"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0 }}
                >易表</NavBar>
                <div  style={{ marginTop:45}}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#33A3F4"
                        barTintColor="white"
                        hidden={this.state.hidden}

                    >
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '0.44rem',
                                    height: '0.44rem',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat'
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '0.44rem',
                                    height: '0.44rem',
                                    background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat'
                                }}
                                />
                            }
                            title="朋友"
                            key="朋友"
                            dot
                            selected={this.state.selectedTab === 'greenTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'greenTab',
                                });
                            }}
                        >
                            {this.renderContent('朋友')}
                        </TabBar.Item>
                        <TabBar.Item
                            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                            title="我的"
                            key="我的"
                            selected={this.state.selectedTab === 'yellowTab'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'yellowTab',
                                });
                            }}
                        >
                            {this.renderContent('我的')}
                        </TabBar.Item>
                    </TabBar>
                </div>
            </div>

        )
    }
}