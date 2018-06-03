class Stopwatch extends React.Component {
    constructor() {
        super();
        this.running = false;
        this.reset();
    }

    reset() {
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
    }

    calculate() {
        let newTimes = {
            miliseconds: this.state.times.miliseconds,
            seconds: this.state.times.seconds,
            minutes: this.state.times.minutes
        };
        newTimes.miliseconds += 1;

        if (newTimes.miliseconds >= 100) {
            newTimes.seconds += 1;
            newTimes.miliseconds = 0;
        }
        if (newTimes.seconds >= 60) {
            newTimes.minutes += 1;
            newTimes.seconds = 0;
        }
        this.setState({ times: newTimes });
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    save() {
        const items = document.querySelector('.results');
        const item = document.createElement('li');
        item.setAttribute('class', 'list-item');
        items.appendChild(item);

        item.innerHTML += this.format(this.state.times);
    }

    removeSaves() {
        const allItems = document.querySelectorAll('.list-item');

        allItems.forEach(i => {
            const items = document.querySelector('.results');
            items.removeChild(document.querySelector('.list-item'));
        });
    }

    render() {
        return React.createElement(
            'div',
            { className: 'timer' },
            React.createElement(
                'nav',
                { className: 'controls' },
                React.createElement(
                    'a',
                    { href: '#', className: 'button', id: 'start', onClick: _ => this.start() },
                    'Start'
                ),
                React.createElement(
                    'a',
                    { href: '#', className: 'button', id: 'stop', onClick: _ => this.stop() },
                    'Stop'
                ),
                React.createElement(
                    'a',
                    { href: '#', className: 'button', id: 'reset', onClick: _ => this.reset() },
                    'Reset'
                )
            ),
            React.createElement(
                'div',
                { className: 'stopwatch' },
                this.format(this.state.times)
            ),
            React.createElement(
                'div',
                { className: 'result-list' },
                React.createElement(
                    'div',
                    { className: 'nav-list' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button btn-save', id: 'save', onClick: e => this.save(e) },
                        'Save result'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button btn-save', id: 'removeAll', onClick: e => this.removeSaves(e) },
                        'Remove all result'
                    )
                ),
                React.createElement('ul', { className: 'results' })
            )
        );
    }
}
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
