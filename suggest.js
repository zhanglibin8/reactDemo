
let Suggest = React.createClass({
    getInitialState(){
        return {words:[],currentIndex:-1,word:''};
    },
    handleKeyUp(event){
        let code = event.keyCode;
        if(code == 40 || code == 38){
            var newIndex;
            if(code == 40){
                newIndex = this.state.currentIndex+1;
                if(newIndex >= this.state.words.length){
                    newIndex = 0;
                }
            }else if(code == 38){
                newIndex = this.state.currentIndex-1;
                if(newIndex < 0){
                    newIndex = this.state.words.length-1;
                }
            }
            this.setState({currentIndex:newIndex},()=>{
                let selectedWord = this.state.words[this.state.currentIndex];
                this.setState({word:selectedWord},()=>{
                    if(this.timer){
                        clearTimeout(this.timer);
                    }
                    this.timer = setTimeout(function(wd){
                        window.location.href=`https://www.baidu.com/s?wd=${selectedWord}`;
                    },2000);
                });
            });

        } else{
            var word = event.target.value;
            $.ajax({
                url:'http://www.baidu.com/su',
                method:'GET',
                jsonp:'cb',
                dataType:'jsonp',
                data:{wd:word,name:'zfpx'},
                context:this,
                success(result){
                    var words = result.s;
                    this.setState({words});
                }
            })
        }

    },
    handleChange(event){
        this.setState({word:event.target.value});
    },
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <input type="text" value={this.state.word} className="form-control" onKeyUp={this.handleKeyUp} onChange={this.handleChange}/>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.words.map((item,index)=>{
                                return <li key={index} className={"list-group-item "+(this.state.currentIndex==index?'active':'')}>{item}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Suggest/>,document.querySelector('#container'));