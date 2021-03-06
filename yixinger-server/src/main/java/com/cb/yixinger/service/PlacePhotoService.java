package com.cb.yixinger.service;

import com.cb.yixinger.entity.PageBean;
import com.cb.yixinger.entity.PlacePhoto;

import java.util.List;

/**
 * @Description: 地点照片Service
 * @author: YFZX-CB-1784 ChenBen
 * @create: 2019-01-22 17:04
 **/
public interface PlacePhotoService {
    void addPlacePhotoByReptile(String photoList, String placeId);

    List<PlacePhoto> getPlacePhoto(String uid);

    PageBean<PlacePhoto> getPlacePhotoByUid(String uid, Integer pageNo, Integer pageSize);

    PlacePhoto getPlacePhotoByPlacePhotoId(Integer placePhotoId);

    PlacePhoto updateReadTimes(PlacePhoto placePhoto);

    void deletePlacePhotoById(String idList);

    void addPlacePhoto(PlacePhoto placePhoto);
}
