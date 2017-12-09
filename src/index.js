import dva from 'dva';
import hashHistory from 'dva/router';
import 'antd/dist/antd.less';
import './index.css';

// 1. Initialize
const app = dva({
  history: hashHistory,
  // onError(e){
  //
  // }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/users'));
app.model(require('./models/followManage'));
app.model(require('./models/gallery'));
app.model(require('./models/photo'));
app.model(require('./models/album'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
