import React, { Component } from 'react';
import { View, VrButton, Text, asset } from 'react-360';
import Entity from 'react-360/Libraries/Mesh/Entity';

class Disk extends Component {
    mouseIn = false;

    triggerClick = () => {
        if (this.mouseIn) {
            this.props.onClick();
        }
    }

    triggerCountdown = () => {
        setTimeout(() => {
            this.triggerClick();
        }, 1000);
    }

    handleEnter = () => {
        this.mouseIn = true;
        this.triggerCountdown();
    }

    handleExit = () => {
        this.mouseIn = false;
    }

    render() {
        const { translate, rotate, empty, onClick } = this.props;

        if (empty) {
            return (
                <View
                    onEnter={this.handleEnter}
                    onExit={this.handleExit}
                    style={{
                        position: 'absolute',
                        transform: [
                            { translateX: translate[0] - 10 },
                            { translateY: translate[1] + 15 },
                            { translateZ: translate[2] },
                        ]
                    }}
                >
                    <VrButton><Text>{'x'}</Text></VrButton>
                </View>
            );
        }
    
        return (
            <Entity
                source={{obj: asset('disk.obj'), mtl: asset('disk.mtl')}}
                style={{
                    transform: [
                        { translateX: translate[0] },
                        { translateY: translate[1] },
                        { translateZ: translate[2] },
                        { rotateX: rotate }
                    ]
                }}
            />
        );
    }
}

export default Disk;