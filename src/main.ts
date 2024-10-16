import { createApp } from 'vue'
import'vant/lib/index.css'
import App from './App.vue'
import persist from 'pinia-plugin-persistedstate'
import {
    BackTop, Badge,
    Button,
    Cell,
    Search,
    CellGroup, Col,
    ContactCard,
    DatePicker, Divider,
    Field,
    Form, Grid, GridItem, Icon,
    List,
    Loading,
    NavBar,
    NoticeBar, Notify, Picker,
    Popup,
    PullRefresh, Row,
    Skeleton,
    SkeletonAvatar,
    SkeletonImage,
    SkeletonParagraph,
    SkeletonTitle, Step,
    Stepper, Steps,
    Sticky, Swipe,
    SwipeCell, SwipeItem,
    Switch,
    Tab, Tabbar, TabbarItem,
    Tabs,
    Tag,
    Toast
} from 'vant';
import { Image as VanImage } from 'vant';
import {router} from "./router/config.ts";
import {createPinia} from "pinia";
import './axios/config.ts'

const app = createApp(App);
app.use(List);
app.use(Button);
app.use(Tab);
app.use(Tabs);
app.use(CellGroup)
app.use(Cell)
app.use(Tag)
app.use(PullRefresh);
app.use(Divider);
app.use(Badge);
app.use(Toast);
app.use(NoticeBar);
app.use(ContactCard);
app.use(Sticky);
app.use(Form);
app.use(Field);
app.use(router)
app.use(NavBar);
app.use(Popup);
app.use(Stepper);
app.use(DatePicker);
app.use(Switch);
app.use(Loading);
app.use(SwipeCell);
app.use(Skeleton);
app.use(SkeletonTitle);
app.use(SkeletonImage);
app.use(SkeletonAvatar);
app.use(SkeletonParagraph);
app.use(Picker);
app.use(Col);
app.use(Row);
app.use(BackTop);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Swipe);
app.use(SwipeItem);
app.use(Badge);
app.use(Step);
app.use(Steps);
app.use(Grid);
app.use(Icon);
app.use(GridItem);
app.use(Notify);
app.use(VanImage);
app.use(createPinia().use(persist))
app.use(Search);
app.mount('#app')
