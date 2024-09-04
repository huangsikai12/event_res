import { createApp } from 'vue'
import'vant/lib/index.css'
import App from './App.vue'
import persist from 'pinia-plugin-persistedstate'
import {
    Button,
    Cell,
    CellGroup,
    ContactCard,
    DatePicker,
    Field,
    Form,
    List,
    Loading,
    NavBar,
    NoticeBar, Picker,
    Popup,
    PullRefresh,
    Skeleton,
    SkeletonAvatar,
    SkeletonImage,
    SkeletonParagraph,
    SkeletonTitle,
    Stepper,
    Sticky,
    SwipeCell,
    Switch,
    Tab,
    Tabs,
    Tag,
    Toast
} from 'vant';
import {router} from "./router/config.ts";
import {createPinia} from "pinia";

const app = createApp(App);
app.use(List);
app.use(Button);
app.use(Tab);
app.use(Tabs);
app.use(CellGroup)
app.use(Cell)
app.use(Tag)
app.use(PullRefresh);
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
app.use(createPinia().use(persist))
app.mount('#app')
