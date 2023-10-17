/*
 * Copyright (c) 2023. Taimos GmbH http://www.taimos.de
 */

package de.taimos.lumigodemo;

import java.io.IOException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * The following Java code defines a MyEndpoint REST controller class with a root endpoint that makes an HTTP call to the taimos.de URL using the OkHttp3 library.
 */
@RestController
public class MyEndpoint {

		@GetMapping("/")
		public String getRoot() throws IOException {
				
				// Logging that this method has been called
				System.out.println("CALLED!");

				// Creating a new instance of OkHttpClient
				OkHttpClient client = new OkHttpClient();

				// Calling the website
				Request request = new Request.Builder()
								.url("http://taimos.de")
								.build();

				try (Response response = client.newCall(request).execute()) {
						// If the response is successful, get the response body as a string and return it
						String res = response.body().string();
						// System.out.println(res);
						// Logging that we've received the result from the request
						System.out.println("GOT RESULT");
						return res;
				} catch (Exception e) {
						// Log any exceptions that occurred while making the request and throw them
						e.printStackTrace();
						throw e;
				}
		}

}
