package com.cb.yixinger;

import com.cb.yixinger.entity.TkMybatisTest;
import com.cb.yixinger.service.TestService;
import net.sf.json.JSONObject;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class YixingerApplicationTests {
    @Autowired
    private TestService testService;

    @Test
    public void contextLoads() {

    }

    @Test
    public void jsoupTest() {
        String url = "https://map.baidu.com/?ugc_type=3&ugc_ver=1&qt=detailConInfo&device_ratio=1&compat=1&t=1542763086565&uid=38abdda9d1f4af0f3110af96&primaryUid=1175400224615406276&auth=XALx853BcA248H7bWFvB%40wZv%3DSaJXBA4uxHEzNLBVRztykiOxAXXwy1uVt1GgvPUDZYOYIZuxtdw8E62qvFu2gz4yYxGccZcuVtPWv3Guzt7xjhN%40ThwzBDGJ4P6VWvcEWe1GD8zv7u%40ZPuxtfvAughxehwzJGBP4B6GBvgjLLwWvrZZWux";
        //String url = "https://map.baidu.com";
        Connection con = Jsoup.connect(url).ignoreContentType(true);
        con.header("Referer", "https://map.baidu.com/");
        con.header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36");
        byte[] doc = new byte[0];
        try {
            doc = con.execute().bodyAsBytes();
        } catch (IOException e) {
            e.printStackTrace();
        }
        String js = null;
        try {
            js = new String(doc, "GBK");

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = JSONObject.fromObject(js);
        System.out.println(jsonObject.toString(2));
    }

    @Test
    public void addTest(){
        TkMybatisTest tkMybatisTest = new TkMybatisTest();
        tkMybatisTest.setName("ben");
        tkMybatisTest.setRealName("陈奔");
        tkMybatisTest.setAge(21);
        testService.insrtTest(tkMybatisTest);
    }

    @Test
    public void updateTest(){
        TkMybatisTest tkMybatisTest = new TkMybatisTest();
        tkMybatisTest.setId(1);
        tkMybatisTest.setName("陈奔");
        tkMybatisTest.setRealName("ben");
        tkMybatisTest.setAge(18);
        testService.updateTest(tkMybatisTest);
    }

    @Test
    public void deleteTest(){
        testService.deleteTest(2);
    }

    @Test
    public void getTestList(){
        System.out.println(testService.getTestList());
    }

    @Test
    public void getTestListByNameAndAgeTest(){
        System.out.println(testService.getTestListByNameAndAge("ben",21));
    }
}
