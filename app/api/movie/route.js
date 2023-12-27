import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Movie from "@/models/movie";
import axios from "axios";

export async function PUT(request) {
  try {
    connectToDB();

    const formData = await request.formData();
    const file = formData.get('file')
    const publishedYear = formData.get('publishedYear')
    const title = formData.get('title')
    const _id = formData.get('_id')
    
    const data = new FormData();
    data.append('upload_preset', 'rwrce3q3');
    data.append('file', file);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.cloudinary.com/v1_1/desadu3u3/upload',
      data: data
  };
  const response = await axios.request(config)
  const fileUrl = response?.data?.url ?? ""

    if(!!_id){
        const updatedMovie =  await Movie.findOneAndUpdate({_id}, {title , publishedYear, moviePoster: fileUrl})
        const response = NextResponse.json({
            message: "Movie data updated succesfully",
            success: true,
        },{status: 200})

        return response;
    }
    else{
        const newMovie = new Movie({
          title,
          publishedYear,
          moviePoster: fileUrl
        })
        const savedMovie = await newMovie.save()

        const response = NextResponse.json({
            message: "Movie data inserted succesfully",
            success: true,
        },{status: 200})

        return response;
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    connectToDB();

    const reqBody = await request.json();
    const { page, pageSize } = reqBody;
    const aggregation = [
      {
        $facet: {
          data: [
            { $skip: ((page || 1) - 1) * (pageSize || 8) },
            { $limit: pageSize || 8 },
          ],
          totalRecords: [{ $count: "count" }],
        },
      },
    ];

    const [{ data = [], totalRecords = 0 }] = await Movie.aggregate(
      aggregation
    );
    const response = NextResponse.json(
      {
        message: "Movie data fetched succesfully",
        success: true,
        data: data,
        totalRecords: totalRecords[0]?.count ?? 0,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    connectToDB();

    const id = request.nextUrl.searchParams.get("id");
    const data = await Movie.findOne({ _id: id }).exec();

    const response = NextResponse.json(
      {
        message: "Movie Data fetched Succesfully",
        success: true,
        data: data,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
